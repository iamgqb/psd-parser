/**
 * Created by Gqb on 14/11/25.
 */

function calculate(_){
    var length,
        width = _.header.width,
        height = _.header.height,
        channels = _.header.channelsNum;
    switch (_.header.depth){
        case 1  : length = (width+7)/8*height;break;
        case 16 : length = width*height*2;break;
        default : length = width*height;break;
    }
    length *= channels;

    return length;
}

function processData(data, channels){
    //将image data section的数据处理成通道形式
    var channelInfo = [],
        len = data.length/channels; //一条通道的长度
    for (var i=0;i<channels;i++){
        channelInfo.push({
            id: i,
            data: data.splice(0, len)
        })
    }

    return channelInfo
}

module.exports = function(PSD){
    return processData(PSD.file.read(calculate(PSD)), PSD.header.channelsNum)
};