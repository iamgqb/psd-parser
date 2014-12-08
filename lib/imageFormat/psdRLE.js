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
        //处理成 RRR GGG BBB
        data = data.concat(decodeRLE(height, file, byteCounts.slice(height*i, height*(i+1))));
    }
    return data
};