/**
 * Created by Gqb on 14/12/5.
 */

var PNG = require('pngjs').PNG,
    fs  = require('fs');

var imageFun = require('./imageHelper');

function processData(data, channels){
    //将image data section的数据处理成通道形式
    var channelInfo = [],
        len = data.length/channels; //一条通道的长度
    for (var i=0;i<channels;i++){
        channelInfo.push({
            id: i,
            data: data.splice(0, len)
        })
    }

    return channelInfo
}

module.exports = function(PSD){
    var _ = PSD;

    var imageData = _.imageData = {},
        file = _.file;

    imageData.width = _.header.width;
    imageData.height = _.header.height;

    var compression = file.readShort();

    imageData.data = imageFun.PSDFormat[compression](_);
    imageData.channelInfo = processData(Array.prototype.slice.apply(imageData.data), _.header.channelsNum);
    imageData.pixelData = imageFun.mergeImageData(imageData, _.header.colorMode);

    imageData.saveAsPng = function(output){
        var self = this;
        var png = new PNG({
            width: self.width,
            height: self.height,
            filterType: 4
        });
        if(self.pixelData) {
            png.data = self.pixelData;
            png.pack().pipe(fs.createWriteStream(output));
        } else {
            throw 'Not support the colorMode'
        }
    };
};