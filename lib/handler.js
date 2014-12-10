/**
 * Created by Gqb on 14/12/10.
 */
// 对最终的psd对象进行输出处理

module.exports = function(PSD){
    var _children, _tree;
    return {
        _psd_: PSD,

        getDescendants: function(){
            // 获取 扁平化的图层
            if(_children) return _children;

            _children = PSD.layerMaskInfo.layerInfo.layers;
            return _children
        },
        getTree: function(){
            // 获取 树型图层
            if (_tree) return _tree;

            var layers = this.getDescendants();

            var current = [];
            var queue = [];
            layers.forEach(function(el){
                var groupSig = el.additional['lsct'];
                if(groupSig && (groupSig.type === 1 || groupSig.type === 2)){
                    // group start
                    var g = {
                        type: 'group',
                        visible: el.visible,
                        name: el.additional.luni,
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
        }
    }
};