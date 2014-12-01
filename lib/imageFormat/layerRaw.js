/**
 * Created by Gqb on 14/12/1.
 */

module.exports = function(layer, file){
    return file.read((layer.right-layer.left)*(layer.bottom-layer.top))
};