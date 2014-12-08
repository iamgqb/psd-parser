/**
 * Created by Gqb on 14/12/1.
 */
var decodeRLE = require('./decodeRLE');

function parseByteCounts(height, file){
    var temp = [];
    for (var i=0; i<height; i++){
        temp.push(file.readShort());
    }
    return temp;
}

module.exports = function(layer, file){
    return decodeRLE(layer.height, file, parseByteCounts(layer.height, file))
};