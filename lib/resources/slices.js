/**
 * Created by Gqb on 14/12/11.
 */
var Descriptor = require('../descriptor');

function slicesResourceBlock(file){
    var ID = file.readInt(),
        groupID = file.readInt(),
        origin = file.readInt(),
        layerID;

        if(origin===1) layerID = file.readInt();

    return{
        ID     : ID,
        groupID: groupID,
        origin : origin,
        layerID: layerID,
        name   : file.readUnicodeString(),
        type   : file.readInt(),
        left   : file.readInt(),
        top    : file.readInt(),
        right  : file.readInt(),
        bottom : file.readInt(),

        url    : file.readUnicodeString(),
        target : file.readUnicodeString(),
        message: file.readUnicodeString(),
        alt    : file.readUnicodeString(),

        isHTML  : file.readBoolean(),
        cellText: file.readUnicodeString(),

        horizontalAlign: file.readInt(),
        verticalAlign  : file.readInt(),
        alphaColor     : file.readByte(),
        red            : file.readByte(),
        green          : file.readByte(),
        blue           : file.readByte()
    }


}

function headerFor6(file){
    var top = file.readInt(),
        left = file.readInt(),
        bottom = file.readInt(),
        right = file.readInt();

    var groupName = file.readUnicodeString();

    var num = file.readInt();
    var slices = [];
    for (var i=0; i<num; i++){
        slices.push(slicesResourceBlock(file));
    }
    return slices
}
function headerFor7Later(file){
    file.seek(4);//descriptor version
    return new Descriptor(file)
}
module.exports = {
    id: 1050,
    parse: function(file, size){
        var startPos = file.now();
        var version = file.readInt();
        var obj;
        if(version == 6){
           obj = headerFor6(file)
        }
        if(version == 7 || version == 8){
            obj = headerFor7Later(file)
        }
        file.seek(size, startPos);
        return obj
    }
};