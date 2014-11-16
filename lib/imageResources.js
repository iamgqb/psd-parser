/**
 * Created by Gqb on 14/11/12.
 */

var Resources = [
    require('./resources/layer_links')
];


module.exports = function(PSD){
    var _ = PSD;

    var imageResources = _.imageResources = {},
        file = _.file;

    var startPos = imageResources.startPos = file.pos,
        length = imageResources.length = file.readInt();

    var endPos = startPos+length;
    var block = imageResources.imageResourceBlock = {};

    while(file.pos < endPos){
        var sig = file.readString(4),
            id = file.readShort(),
            nameSize = file.readByte(),//pascal string; first byte meas length
            nameLength = file.pad2(nameSize===0?1:nameSize)-1,
            name = file.readString(nameLength),
            size = file.pad2(file.readInt()); //data length
        
        for (var i in Resources)
            if (Resources[i].id == id){
                block[id] = Resources[i].parse(file, size);
            } else {
                file.seek(size);
            }
    }
    imageResources.endPos = file.pos;
    console.log(block)
};