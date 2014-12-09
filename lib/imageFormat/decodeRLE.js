/**
 * Created by Gqb on 14/12/8.
 */

module.exports = function(height, file, bytes){
    var byteCount, endPos, len;
    var data = [], val;
    for(var i=0; i<height; i++){
        byteCount = bytes[i];
        endPos = file.now() + byteCount;

        while (file.now() < endPos){
            len = file.readByte();
            //i don`t know
            if (len < 128){
                len++;

                data.splice.apply(data, [data.length, 0].concat([].slice.call(file.read(len))));

            }
            else if (len > 128){
                len ^= 0xff;
                len += 2;
                val = file.readByte();
                for (var l=0; l<len; l++){
                    data.push(val);
                }
            }
            //            else len==128 do nothing;
        }
    }
    return data
};