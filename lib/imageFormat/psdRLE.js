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
    var data = [];
    for(var i=0; i<channels; i++){
        //根据 RRR GGG BBB 处理
        /*
        * 根据通道的方式处理
        * 每次只处理一个通道
        * decodeRLE中根据通道处理
        * */
        var deData = decodeRLE(height, file, byteCounts.slice(height*i, height*(i+1)));

        for(var j=0;j<deData.length;j++){
            data.push(deData[j])
        }
//        data.splice.apply(data, [data.length, 0].concat([].slice.call(deData)));

    }
    return data
};