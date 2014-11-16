/**
 * Created by Gqb on 14/11/16.
 */

module.exports = {
    id  : 1026,
    name: 'layerLink',
    parse: function(PSD, size){
        var linkArr = [];
        var _ = PSD,
            end = _.file.pos + size;
        while (end > _.file.pos){
            linkArr.push(_.file.readShort());
        }
        return linkArr.reverse();
    }
};