/**
 * Created by Gqb on 14/11/25.
 */

function calculate(_){
    var length,
        width = _.header.width,
        height = _.header.height,
        channels = _.header.channelsNum;
    switch (_.header.depth){
        case 1  : length = (width+7)/8*height;break;
        case 16 : length = width*height*2;break;
        default : length = width*height;break;
    }
    length *= channels;

    return length;
}

module.exports = function(PSD){
    return PSD.file.read(calculate(PSD))
};