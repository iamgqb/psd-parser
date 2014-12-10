
/**
 * Created by Gqb on 14/11/9.
 */

var parseHeader = require('./lib/header'),
    parseColorMode = require('./lib/colorMode'),
    parseImageResources = require('./lib/imageResources'),
    parseLayerMaskInfo = require('./lib/layerMaskInfo'),
    parseImageData = require('./lib/imageData'),
    init = require('./lib/init'),
    handle = require('./lib/handler');

exports.parse = function(path){
    var PSD = init(path);
    parseHeader(PSD);
    parseColorMode(PSD);
    parseImageResources(PSD);
    parseLayerMaskInfo(PSD);
    parseImageData(PSD);
    return handle(PSD);
};
//TODO 树形分层
//一些get方法，如链接图层
//文字图层的相应处理