/**
 * Created by Gqb on 14/12/8.
 */

var PSD = require('../index');

var psd = PSD.parse('./example/blank.psd');
//console.log(PSD.layerMaskInfo.layerInfo.layers);
//PSD.layerMaskInfo.layerInfo.layers[0].saveAsPng('test.png')
console.log(psd.imageData);
psd.imageData.saveAsPng('./example/image/test.png');