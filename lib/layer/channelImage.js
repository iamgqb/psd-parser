/**
 * Created by Gqb on 14/11/24.
 */

var Format = [
    //0=Raw 1=RLE 2=ZIP without prediction 3=ZIP with prediction
    require('../imageFormat/layerRaw'),
    require('../imageFormat/layerRLE')
];

function parseCompression(file){
    return file.readShort()
}

function parseImageData(layer, file){
    var compression = parseCompression(file);
console.log(compression)
    return Format[compression](layer, file);
}


module.exports = function(layer, file) {
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
console.log(channel.data, channel.length)
    }
console.log(layer)
};