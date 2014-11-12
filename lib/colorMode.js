/**
 * Created by Gqb on 14/11/12.
 */

module.exports = function(PSD){
    var _ = PSD;

    _.colorMode = {};

    _.colorMode.startPos = _.file.pos;
    _.colorMode.length = _.file.readInt();

    _.file.seek(_.colorMode.length);

    _.colorMode.endPos = _.file.pos;
    return PSD;
};