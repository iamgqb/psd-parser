/**
 * Created by Gqb on 14/11/9.
 */

var fs = require('fs');

module.exports = function (path) {
    return require('./file')(fs.readFileSync(path));
};
