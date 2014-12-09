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

    var parsed = false, pos = file.now();

    imageData.width = _.header.width;
    imageData.height = _.header.height;


    imageData.toImageData = function(){
        if(parsed) return;

        file.tell(pos);
        var self = this;
        var compression = file.readShort();

        self.data = imageFun.PSDFormat[compression](_);
        self.channelInfo = processData(Array.prototype.slice.apply(self.data), _.header.channelsNum);
        self.pixelData = imageFun.mergeImageData(this, _.header.colorMode);
        parsed = true;
    };

    imageData.saveAsPng = function(output){
        var self = this;
        self.toImageData();
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