/**
 * Created by Gqb on 14/11/12.
 */

var ref = [
        require('./resources/layer_links'),
        require('./resources/slices')
    ],

    Resources = {};

ref.forEach(function(o){
    Resources[o.id] = o;
});

module.exports = function(PSD){
    var _ = PSD;

    var imageResources = _.imageResources = {},
        file = _.file;

    var startPos = imageResources.startPos = file.now(),
        length = imageResources.length = file.readInt();

    var endPos = startPos+length;
    var block = imageResources.imageResourceBlock = {};

    while(file.now() < endPos){
        var sig = file.readString(4),
            id = file.readShort(),
            nameSize = file.readByte(),//pascal string; first byte meas length
            nameLength = file.pad2(nameSize===0?1:nameSize)-1,
            name = file.readString(nameLength),
            size = file.pad2(file.readInt()); //data length
        

        if (Resources[id]){
            block[id] = Resources[id].parse(file, size);
        } else {
            file.seek(size);
        }
    }
    imageResources.endPos = file.now();
};