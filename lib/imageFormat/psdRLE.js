/**
 * Created by Gqb on 14/11/25.
 */

var decodeRLE = require('./decodeRLE');

function parseByteCounts(height, channels, file){
    var temp = [];

    for (var i=0; i<channels*height; i++){
        temp.push(file.readShort());
    }
    return temp
}

module.exports = function(PSD){
    var _ = PSD;

    var channels = _.header.channelsNum,
        height = _.header.height,
        file = _.file;

    var byteCounts = parseByteCounts(height, channels, file);
    var channelInfo = [];
    for(var i=0; i<channels; i++){
        //将 RRR GGG BBB 处理为通道模式
        /*
        * 根据通道的方式处理
        * 每次只处理一个通道
        * decodeRLE中根据通道处理
        * */

        channelInfo.push({
            id: i,
            data: decodeRLE(height, file, byteCounts.slice(height*i, height*(i+1)))
        });

    }
    return channelInfo
};