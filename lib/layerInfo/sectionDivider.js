/**
 * Created by Gqb on 14/12/10.
 */
// 组图层


module.exports = {
    id: 'lsct',
    parse: function(file){
        var type = file.readInt();
        file.seek(4); // sig
        var blendMode = file.readInt(),
            subType= file.readInt();

        return {
            type: type,
            blendMode: blendMode,
            subType: subType
        }
    }
};