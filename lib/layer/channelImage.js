/**
 * Created by Gqb on 14/11/24.
 */

var PNG = require('pngjs').PNG,
    fs  = require('fs');

var imageFun = require('../imageHelper');


function parseCompression(file){
    return file.readShort()
}

function parseImageData(layer, file){
    var compression = parseCompression(file);
    return imageFun.layerFormat[compression](layer, file);
}


module.exports = function(layer, file, colorMode) {
    for (var i = 0, l = layer.channelInfo.length; i < l; i++) {
        var channel = layer.channelInfo[i];
        if (channel.length <= 0){
            parseCompression(file);// 压缩位
            channel.data = [];
            continue;
        }

        var startPos = file.now();
        channel.data = parseImageData(layer, file);
        file.seek(channel.length, startPos);
    }

    layer.pixelData = imageFun.mergeImageData(layer, colorMode);

    layer.saveAsPng = function(output){
        var self = this;
        var png = new PNG({
            width: self.width,
            height: self.height,
            filterType: 4
        });
        if(self.pixelData){
            png.data = self.pixelData;
            png.pack().pipe(fs.createWriteStream(output))
        } else {
            throw 'Not support the colorMode'
        }
    };
};