/**
 * Created by Gqb on 14/12/8.
 */

var PSD = require('../index');

var psd = PSD.parse('./example/blank.psd');
//console.log(PSD.layerMaskInfo.layerInfo.layers);
//PSD.layerMaskInfo.layerInfo.layers[0].saveAsPng('test.png')
//console.log(psd.imageData);
//psd.imageData.saveAsPng('./example/image/test.png');
console.time('go')
console.log(psd.file.buffer.length)
psd.imageData.saveAsPng('./example/test.png')
//console.log(psd)
for(var i=0;i<psd.layerMaskInfo.layerInfo.layers.length;i++){
    psd.layerMaskInfo.layerInfo.layers[i].saveAsPng('./example/'+i+'.png')
}
console.timeEnd('go')