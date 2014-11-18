/**
 * Created by Gqb on 14/11/18.
 */

module.exports = {
    id: 'lyid',
    parse: function(file){
        return {
            id: file.readInt()
        }
    }
};