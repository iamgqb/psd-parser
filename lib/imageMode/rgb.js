/**
 * Created by Gqb on 14/12/3.
 */

// merge RGB, channel num is 4
// -1=a, 0=r, 1=g, 2=b
module.exports = function(layer){
    var width = layer.width,
        height = layer.height;
    var pixelData = [];

    var a, r, g, b;
    for(var j=0; j<width*height; j++){
        for(var i=0; i<4; i++){
            var v = layer.channelInfo[i];

            switch (v.id){
                case -1: a = v.data[j] || 0;break;
                case  0: r = v.data[j] || 0;break;
                case  1: g = v.data[j] || 0;break;
                case  2: b = v.data[j] || 0;break;
            }
        }
        pixelData = pixelData.concat([r,g,b,a]);
    }
    return pixelData
};