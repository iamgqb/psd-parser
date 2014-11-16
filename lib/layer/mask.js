/**
 * Created by Gqb on 14/11/16.
 */

module.exports = function(file){
    var size = file.readInt(),
        endPos = file.pos+size;
    if (size === 0) return null;

    var top = file.readInt(),
        left = file.readInt(),
        bottom = file.readInt(),
        right = file.readInt(),

        defaultColor = file.readByte(),
        flag = file.readByte();

    if( (flag & (0x01 << 4)) > 0 ){

    }

    file.pos = endPos;
};