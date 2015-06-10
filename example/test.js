/**
 * Created by Gqb on 14/12/8.
 */

var PSD = require('../index');

var psd = PSD.parse('./test.psd');

console.time('go');

//console.log(psd.getTree());//树型结构，与psd中顺序相同
//console.log(psd.getDescendants());//扁平化数组图层
//console.log(psd.getDescendants()[0].get('wordSnippets'));//一些get方法

//psd.saveAsPng('./example/output.png');//psd缩略图

//var layers = psd.getDescendants();
//for(var i=0;i<layers.length;i++){
//    layers[i].saveAsPng('./example/'+i+'.png'); //各个图层转成png
//}
console.log(psd.getSlices())
console.timeEnd('go');
