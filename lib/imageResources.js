/**
 * Created by Gqb on 14/11/12.
 */

module.exports = function(PSD){
    var _ = PSD;

    _.imageResources = {};

    var startPos = _.imageResources.startPos = _.file.pos,
        length = _.imageResources.length = _.file.readInt();

    var endPos = startPos+length;
    var block = _.imageResources.imageResourceBlock = {};

    while(_.file.pos < endPos){
        var sig = _.file.readString(4),
            id = _.file.readShort(),
            nameSize = _.file.readByte(),//pascal string; first byte meas length
            nameLength = _.file.pad2(nameSize===0?1:nameSize)-1,
            name = _.file.readString(nameLength),
            size = _.file.pad2(_.file.readInt());

        block[id] = {
            sig: sig,
            name: name
        };
        _.file.seek(size);
    }
};