/**
 * Created by Gqb on 14/12/8.
 */

var PSD = require('../index');

var psd = PSD.parse('./example/test.psd');

console.time('go');

//console.log(psd.getTree());
console.log(psd.getDescendants());//会带有layer group，目前没有去掉

//psd.saveAsPng('./example/output.png');

var layers = psd.getDescendants();
for(var i=0;i<layers.length;i++){
    layers[i].saveAsPng('./example/'+i+'.png');
}

console.timeEnd('go');
