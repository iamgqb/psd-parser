/**
 * Created by Gqb on 14/11/25.
 */

module.exports = function(layer, channel, file){
    return file.read(channel.length)
};