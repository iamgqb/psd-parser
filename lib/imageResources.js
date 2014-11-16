/**
 * Created by Gqb on 14/11/12.
 */

var Resources = [
    require('./resources/layer_links')
];


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
            size = _.file.pad2(_.file.readInt()); //data length
        
        for (var i in Resources)
            if (Resources[i].id == id){
                block[id] = Resources[i].parse(PSD, size);
            } else {
                _.file.seek(size);
            }
    }
    console.log(block)
};