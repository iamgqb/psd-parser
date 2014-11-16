/**
 * Created by Gqb on 14/11/9.
 */

var MODES = [
    'BitMap',       //0
    'Grayscale',    //1
    'Indexed',      //2
    'RGB',          //3
    'CMYK',         //4
    undefined,      //5
    undefined,      //6
    'Multichannel', //7
    'Duotone',      //8
    'Lab'           //9
];

module.exports = function(PSD){
    var _ = PSD;

    var header = _.header = {},
        file = _.file;

    header.sig = file.readString(4);
    if (header.sig !== '8BPS')
        throw 'This file seems not a psd file';

    header.version = file.readShort();
    if (header.version !== 1)
        throw 'This file seems not a psd file';

    file.seek(6); //reserved
    header.channelsNum = file.readShort();

    header.height = file.readInt();
    header.width = file.readInt();

    header.depth = file.readShort();

    header.colorMode = MODES[file.readShort()];
    return PSD;
};