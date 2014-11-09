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

    _.header = {};

    _.header.sig = _.file.readString(4);
    if (_.header.sig !== '8BPS')
        throw 'This file seems not a psd file';

    _.header.version = _.file.readShort();
    if (_.header.version !== 1)
        throw 'This file seems not a psd file';

    _.file.seek(6); //reserved;

    _.header.channelsNum = _.file.readShort();

    _.header.height = _.file.readInt();
    _.header.width = _.file.readInt();

    _.header.depth = _.file.readShort();
    _.header.colorMode = MODES[_.file.readShort()];
    return PSD;
};