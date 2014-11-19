/**
 * Created by Gqb on 14/11/18.
 */

function Descriptor(file){
    this.types = {
        'obj ' : this.parseReference,
        'Objc' : this.parseDescriptor,
        'VlLs' : this.parseList,
        'doub' : this.parseDouble,
        'UntF' : this.parseUnitFloat,
        'TEXT' : this.parseString,
        'enum' : this.parseEnumerated,
        'long' : this.parseInteger,
        'bool' : this.parseBoolean,
        'GlbO' : this.parseDescriptor,
        'type' : this.parseClass,
        'GlbC' : this.parseClass,
        'alis' : this.parseAlias,
        'tdta' : this.parseRawData
    };
    this.data = {};
    this.file = file;
    this.parse();
    return this.data
}

Descriptor.prototype.parse = function(file){
//    this.file = file;

    this.data.class = this.parseClass();
    var itemNum = this.file.readInt();

    for(var i=0; i<itemNum; i++){
        var o = this.parseKeyItem();
        this.data[o.id] = o.value;
    }
    return this.data
};

Descriptor.prototype.parseClass = function(){
    return {
        name: this.file.readUnicodeString(),
        id: this.parseID()
    }
};

Descriptor.prototype.parseID = function(){
    var len = this.file.readInt() || 4;
    return this.file.readString(len)
};

Descriptor.prototype.parseKeyItem = function(){
    return {
        id: this.parseID(),
        value: this.parseItem()
    }
};

Descriptor.prototype.parseItem = function(){

    var key = this.file.readString(4);
//    console.log(this.types[key], key)
    return this.types[key].call(this);
};

Descriptor.prototype.parseBoolean = function(){
    return this.file.readBoolean()
};
Descriptor.prototype.parseDouble = function(){
    return this.file.readDouble()
};
Descriptor.prototype.parseInteger = function(){
    return this.file.readInt()
};
Descriptor.prototype.parseIndex = function(){
    return this.file.readInt()
};
Descriptor.prototype.parseOffset = function(){
    return this.file.readInt()
};
Descriptor.prototype.parseString = function(){
//    console.log(this)
    return this.file.readUnicodeString()
};
Descriptor.prototype.parseProperty = function(){
    return {
        class: this.parseClass(),
        id: this.parseID()
    }
};

Descriptor.prototype.parseEnumerated = function(){
    return {
        type: this.parseID(),
        value: this.parseID()
    }
};
Descriptor.prototype.parseEnumeratedReference = function(){
    return {
        class: this.parseClass(),
        type: this.parseID(),
        value: this.parseID()
    }
};

Descriptor.prototype.parseAlias = function(){
    var len = this.file.readInt();
    return this.file.readString(len)
};

Descriptor.prototype.parseList = function(){
    var itemNum = this.file.readInt();
    var data = [];
    for (var i=0; i<itemNum; i++){
//        var v = this.parseItem();
//        data.push(v);
        data.push(this.parseItem());
    }
};
Descriptor.prototype.parseRawData = function(){
    return this.file.read(this.file.readInt())
};
Descriptor.prototype.parseDescriptor = function(){
    return new Descriptor(this.file)
};
Descriptor.prototype.parseReference = function(){
    var types = {
        'prop' : this.parseProperty,
        'Clss' : this.parseClass,
        'Enmr' : this.parseEnumeratedReference,
        'rele' : this.parseOffset,
        'Idnt' : this.parseIdentifier,
        'indx' : this.parseIndex,
        'name' : this.parseName
    };
    var data = [];
    var itemNum = this.file.readInt();
    for (var i=0; i<itemNum; i++){
        var key = this.file.readString(4);
        data.push({
            type: key,
            value: types[key].call(this)
        });
    }
};
Descriptor.prototype.parseUnitFloat = function(){
    var types = {
        '#Ang': 'Angle',
        '#Rsl': 'Density',
        '#Rlt': 'Distance',
        '#Nne': 'None',
        '#Prc': 'Percent',
        '#Pxl': 'Pixels',
        '#Mlm': 'Millimeters',
        '#Pnt': 'Points'
    };
    var unit = types[this.file.readString(4)],
        value = this.file.readDouble();
    return {
        unit: unit,
        value: value
    }
};






function parseReference(file){
    var types = {
        'prop' : parseProperty,
        'Clss' : parseClass,
        'Enmr' : parseEnumeratedReference,
        'rele' : parseOffset,
        'Idnt' : parseIdentifier,
        'indx' : parseIndex,
        'name' : parseName
    };
    var num = file.readInt();
    for(var i=0; i<num; i++){
        types[file.readString(4)](file);
    }
}

function parseDescriptor(file){
    var types = {
        'obj ' : parseReference,
        'Objc' : parseDescriptor,
        'VlLs' : parseList,
        'doub' : parseDouble,
        'UntF' : parseUnitFloat,
        'TEXT' : parseString,
        'enum' : parseEnumerated,
        'long' : parseInteger,
        'bool' : parseBoolean,
        'GlbO' : parseDescriptor,
        'type' : parseClass,
        'GlbC' : parseClass,
        'alis' : parseAlias,
        'tdta' : parseRawData
    };
    var name = file.readUnicodeString(),
        len = file.readInt() || 4,
        classID = file.readString(len),
        num = file.readInt();

    for(var i=0; i<num; i++){
        var k = file.readString(4);
        console.log(types[k])
        types[k](file);
    }
}

function parseList(){}
function parseDouble(file){
    return file.readDouble();
}
function parseUnitFloat(file){
    var types = {
        '#Ang': 'Angle',
        '#Rsl': 'Density',
        '#Rlt': 'Distance',
        '#Nne': 'None',
        '#Prc': 'Percent',
        '#Pxl': 'Pixels',
        '#Mlm': 'Millimeters',
        '#Pnt': 'Points'
    };
    var unit = types[file.readString(4)],
        value = file.readDouble();
    return {
        unit: unit,
        value: value
    }
}
function parseString(file){
    return file.readUnicodeString()
}
function parseEnumerated(){}
function parseInteger(){}
function parseBoolean(){}
function parseClass(file){
    var name = file.readUnicodeString(),
        len = file.readInt() || 4,
        classID = file.readString(len);

    return {
        name: name,
        classID: classID
    }
}
function parseAlias(){}
function parseRawData(){}
function parseProperty(file){
    var name = file.readUnicodeString(),
        lenC = file.readInt() || 4,
        classID = file.readString(lenC),
        lenK = file.readInt() || 4,
        keyID = file.readString(lenK);
    return {
        name: name,
        classID: classID,
        keyID: keyID
    }
}
function parseEnumeratedReference(file){
    var name = file.readUnicodeString(),
        lenC = file.readInt() || 4,
        classID = file.readString(lenC),
        lenT = file.readInt() || 4,
        typeID = file.readString(lenT),
        lenE = file.readInt() || 4,
        enumm = file.readString(lenE);
    return {
        name: name,
        classID: classID,
        typeID: typeID,
        enum: enumm
    }
}
function parseOffset(file){
    var name = file.readUnicodeString(),
        len = file.readInt() || 4,
        classID = file.readString(len)
}

module.exports = Descriptor;