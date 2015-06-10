/**
 * Created by Gqb on 14/12/10.
 */
// 对最终的psd对象进行输出处理

var parseTextLayer = require('./textHelper');

function Layer(l){

    function text(){
        //文本内容
        if(this.additional['TySh']){
            return this.additional['TySh']['textData']['Txt ']
        }
        else {
            console.error('This layer (%s) is not a text layer', this.get('layerName'));
            return false;
        }
    }

    function snippets(){
        //文本图层的详细内容
        if(this.additional['TySh']){
            //it`s an array
            return parseTextLayer(this.additional['TySh'])
        }
        else {
            console.error('This layer (%s) is not a text layer', this.get('layerName'));
            return false;
        }
    }

    function _get(name){
        if(this[name]){
            return this[name];
        }
        else if(this.additional[name]){
            return this.additional[name];
        }
        else {
            console.error('%s attribute not exist', name);
            return false;
        }
    }

    l.get = function(name){
        switch (name){

            case 'layerName': return this.additional['luni'];break;

            case 'text': return text.call(this);break;

            case 'wordSnippets': return snippets.call(this);break;

            default : return _get.call(this, name);
        }
    };


    return l;
}

module.exports = function(PSD){
    var _children, _tree, _childrenWithGroup; //_childrenWithGroup 包含Layer Group End
    return {
        _psd_: PSD,

        saveAsPng: function(output){
            // 整体psd缩略图
            PSD.imageData.saveAsPng(output);
        },
        getDescendants: function(){
            // 获取 扁平化的图层
            if(_children) return _children;
            _children = [];
            _childrenWithGroup = [];

            PSD.layerMaskInfo.layerInfo.layers.forEach(function(l){
                var layer = new Layer(l);
                _childrenWithGroup.push(layer);
                if(!l.additional['lsct']) _children.push(layer);
            });
            return _children
        },
        getTree: function(){
            // 获取 树型图层
            if (_tree) return _tree;

            if(!_childrenWithGroup) this.getDescendants();

            var layers = _childrenWithGroup;

            var current = [];
            var queue = [];
            layers.forEach(function(el){
                var groupSig = el.additional['lsct'];
                if(groupSig && (groupSig.type === 1 || groupSig.type === 2)){
                    // group start
                    var g = {
                        type: 'group',
                        visible: el.visible,
                        name: el.additional['luni'],
                        children: []
                    };
                    current.push(g);
                    queue.push(current);
                    current = g.children;
                }
                else if(groupSig && groupSig.type === 3){
                    // group end
                    current = queue.pop();
                }
                else {
                    // other layer ,not group
                    current.push(el);
                }
            });
            _tree = current;
            return _tree
        },

        getSlices: function(){
            // 获取切片
            var _slice = PSD.imageResources.imageResourceBlock['1050'];

            var slices = [];
            if(_slice.slices) {
                //version > 7
                _slice.slices.forEach(function(s){
                    slices.push({
                        id: s['sliceID'],
                        groupId: s['groupID'],
                        name: s['Nm  '],

                        left: s['bounds']['Left'],
                        top: s['bounds']['Top '],
                        right: s['bounds']['Rght'],
                        bottom: s['bounds']['Btom'],

                        message: s['Msge'],
                        alt: s['altTag'],
                        url: s['url'],
                        target: s['null'],
                        isHTML: s['cellTextIsHTML'],
                        cellText: s['cellText']
                    })
                })
            } else {
                //version = 6
                _slice.forEach(function(s){
                    slices.push({
                        id: s['ID'],
                        groupId: s['groupID'],
                        name: s['name'],

                        left: s['left'],
                        top: s['top'],
                        right: s['right'],
                        bottom: s['bottom'],

                        message: s['message'],
                        alt: s['alt'],
                        url: s['url'],
                        target: s['target'],
                        isHTML: s['isHTML'],
                        cellText: s['cellText']
                    })
                })
            }
            return slices
        }
    }
};