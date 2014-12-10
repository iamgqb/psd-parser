/**
 * Created by Gqb on 14/11/18.
 */
var Descriptor = require('../descriptor'),
    parseEngineData = require('parse-engine-data');

module.exports = {
    id: 'TySh',
    parse: function(file){
        var version = file.readShort(),
            transform = {
                xx: file.readDouble(),
                xy: file.readDouble(),
                yx: file.readDouble(),
                yy: file.readDouble(),
                tx: file.readDouble(),
                ty: file.readDouble()
            },
            textVer = file.readShort(),
            descVer1 = file.readInt(),
            textData = new Descriptor(file),
            warpVer = file.readShort(),
            descVer2 = file.readInt(),
            warpData = new Descriptor(file),

            coords = {
                left : file.readDouble(),
                top : file.readDouble(),
                right : file.readDouble(),
                bottom : file.readDouble()
            };

            textData.EngineData = parseEngineData(textData.EngineData);

        return {
            transform: transform,
            textData: textData,
            warpData: warpData,
            coordinate: coords
        }
    }
};