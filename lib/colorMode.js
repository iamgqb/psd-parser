/**
 * Created by Gqb on 14/11/12.
 */

module.exports = function(PSD){
    var _ = PSD;


    var colorMode = _.colorMode = {},
        file = _.file;

    colorMode.startPos = file.pos;
    colorMode.length = file.readInt();

    file.seek(colorMode.length);

    colorMode.endPos = file.pos;
    return PSD;
};