/**
 * Created by Gqb on 14/12/8.
 */

module.exports = {
    //image 函数集合
    layerFormat : [
        //0=Raw 1=RLE 2=ZIP without prediction 3=ZIP with prediction
        require('./imageFormat/layerRaw'),
        require('./imageFormat/layerRLE')
    ],
    PSDFormat : [
        //0=Raw 1=RLE 2=ZIP without prediction 3=ZIP with prediction
        require('./imageFormat/psdRaw'),
        require('./imageFormat/psdRLE')
    ],
    Mode : {
        '3': require('./imageMode/rgb')
    },

    mergeImageData: function(layer, colorMode){
        if(this.Mode[colorMode])
            return this.Mode[colorMode](layer);

        throw 'Not support the colorMode';
    }
};