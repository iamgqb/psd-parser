/**
 * Created by Gqb on 14/11/16.
 */

module.exports = function(file){
    var length = file.readInt(),
        endPos = file.pos+length;

    var blendingRange = {};

    blendingRange.grey = {
        source: {
            black: [file.readByte(), file.readByte()],
            white: [file.readByte(), file.readByte()]
        },
        dist: {
            black: [file.readByte(), file.readByte()],
            white: [file.readByte(), file.readByte()]
        }
    };
    var nums = (length-8)/8;
    blendingRange.channels = [];
    for(var i=0; i<nums; i++){
        blendingRange.channels.push({
            source: {
                black: [file.readByte(), file.readByte()],
                white: [file.readByte(), file.readByte()]
            },
            dist: {
                black: [file.readByte(), file.readByte()],
                white: [file.readByte(), file.readByte()]
            }
        })
    }

    return blendingRange;
};