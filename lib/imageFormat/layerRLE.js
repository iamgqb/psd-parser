/**
 * Created by Gqb on 14/12/1.
 */

function parseByteCounts(height, file){
    var temp = [];
    for (var i=0; i<height; i++){
        temp.push(file.readShort());
    }
    return temp;
}

function decodeRLE(height, file, bytes){
    var byteCount, endPos, len;
    var data = [], val;
    for(var i=0; i<height; i++){
        byteCount = bytes[i];
        endPos = file.now() + byteCount;

        while (file.now() < endPos){
            len = file.readByte();
//i don`t know
            if (len < 128){
                len++;
                data = data.concat(file.read(len))
            } else {
                len ^= 0xff;
                len += 2;
                val = file.readByte();
                for (var l=0; l<len; l++){
                    data.push(val);
                }
            }
        }
    }
    return data
}

module.exports = function(layer, file){
    return decodeRLE(layer.height, file, parseByteCounts(layer.height, file))
};