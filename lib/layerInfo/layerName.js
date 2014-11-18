/**
 * Created by Gqb on 14/11/18.
 */

module.exports = {
    id: 'luni',
    parse: function(file){
        return file.readUnicodeString();
    }
};