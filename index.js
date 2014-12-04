
/**
 * Created by Gqb on 14/11/9.
 */

var PSD = require('./lib/init')('./blank.psd');

var parseHeader = require('./lib/header'),
    parseColorMode = require('./lib/colorMode'),
    parseImageResources = require('./lib/imageResources'),
    parseLayerMaskInfo = require('./lib/layerMaskInfo');

parseHeader(PSD);
parseColorMode(PSD);
parseImageResources(PSD);
parseLayerMaskInfo(PSD);
//parseImage(PSD);


//console.log(PSD.layerMaskInfo.layerInfo.layers);
//PSD.layerMaskInfo.layerInfo.layers[0].saveAsPng('test.png')

module.exports = function(path){
    return require('./lib/init')(path)
};