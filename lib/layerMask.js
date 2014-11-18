/**
 * Created by Gqb on 14/11/16.
 */

var layer = require('./layer/records');

function layerInfo(_, file){
    var layerInfo = _.layerInfo = {};

    layerInfo.length = file.pad2(file.readInt());
    layerInfo.layerCount = file.readShort();

    _.mergedAlpha = false;
    if (layerInfo.layerCount < 0){
        layerInfo.layerCount = -layerInfo.layerCount;
        _.mergedAlpha = true; //
    }

    layerInfo.layers = [];
    for (var i= 0; i<layerInfo.layerCount; i++){
        layerInfo.layers.push(layer(file));
    }
    layerInfo.layers.reverse();

//    console.log(layerInfo)
}



module.exports = function(PSD){
    var _  = PSD;
    var layerMask = _.layerMask = {},
        file = _.file;

    layerMask.startPos = file.pos;
    layerMask.length = file.readInt();

    layerInfo(layerMask, file);

};