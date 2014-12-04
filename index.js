
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


//console.log(PSD);


module.exports = function(path){
    return require('./lib/init')(path)
};