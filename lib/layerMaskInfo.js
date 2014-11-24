/**
 * Created by Gqb on 14/11/16.
 */

var parseLayer = require('./layer/records');


module.exports = function(PSD){
    var _  = PSD;
    var layerMaskInfo = _.layerMaskInfo = {},
        file = _.file;
    layerMaskInfo.startPos = file.pos;

    layerMaskInfo.length = file.readInt();
    //layers
    var layerInfo = layerMaskInfo.layerInfo = {};

    layerInfo.length = file.pad2(file.readInt());

    layerInfo.layerCount = file.readShort();
    _.mergedAlpha = false;

    if (layerInfo.layerCount < 0){
        layerInfo.layerCount = -layerInfo.layerCount;
        _.mergedAlpha = true; //
    }

    layerInfo.layers = [];
    for (var i= 0; i<layerInfo.layerCount; i++){
        layerInfo.layers.push(parseLayer(file));
    //TODO new parseLayer
    }

    layerInfo.layers.forEach(function(layer){});
    //TODO channel image data

    layerInfo.layers.reverse();
    console.log(layerInfo.layers[0].channelInfo)
};
