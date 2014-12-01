/**
 * Created by Gqb on 14/11/16.
 */

module.exports = {
    id  : 1026,
    name: 'layerLink',
    parse: function(file, size){
        var linkArr = [];
        var end = file.now() + size;
        while (end > file.now()){
            linkArr.push(file.readShort());
        }
        return linkArr.reverse();
    }
};