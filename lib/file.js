/**
 * Created by Gqb on 14/11/9.
 */

var jspack = require('jspack').jspack;


var Constructor = function(buffer){
    var PSD = {};
    PSD.file = {};
    PSD.file.buffer = buffer;
    PSD.file.pos = 0;

    PSD.file.read = function(length){
        var self = this;
        var temp = [];
        for (var i = 0; i < length; i++){
            temp.push(self.buffer[self.pos++])
        }
        return temp;
    };

    PSD.file.readShort = function(){
        return jspack.Unpack('h', this.read(2))[0]
    };

    PSD.file.readInt = function(){
        return jspack.Unpack('i', this.read(4))[0]
    };

    PSD.file.readString = function(length){
        return jspack.Unpack(length+'s', this.read(length))[0]
    };


    PSD.file.seek = function(offset, whence){
        if(!isNaN(whence))
            this.pos = whence;
        this.pos += offset;
    };
    return PSD;
};

module.exports = Constructor;