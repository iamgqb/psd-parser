# PSD Parser

造个轮子

### 参考文档

官方psd文档，部分有错 [Adobe Photoshop File Formats Specification](http://www.adobe.com/devnet-apps/photoshop/fileformatashtml/)

翻译文档(不完整) [Adobe Photoshop File Formats Specification](http://gitlab.alibaba-inc.com/qingbo.gqb/psd-spec-translate/raw/master/index.html)

### 其他的PSD解析
coffee版 [psd.js](https://github.com/meltingice/psd.js)

ruby版 [psd.rb](https://github.com/layervault/psd.rb)

c版 [psdump](https://github.com/alco/psdump)

因为 ruby 版与 c 版对于前端来讲不好直接拿来用呐，coffee版输出的对象很庞大，同时运行时还要先编译一下，于是 **生命不息，折腾不止** ，有了这个版本；

### 简单使用
```javascript

	var PSD = require('psdparser');
	var psd = PSD.parse('./test.psd');
	console.log(psd)
	psd.getDescendants() //扁平化的图层数组
	psd.getTree() //树型结构的图层数组，与psd中结构相符
    console.log(psd._psd_) //解析psd后的原始对象
    
    //psd缩略图的输出,只支持png输出
    psd.saveAsPng('test.png') //目前要注意目录是否存在
    //某个图层的png输出
    psd.getDescendants()[0].saveAsPng('layer.png')
```

### TODO

- ~~图层的树型输出~~
- 文字图层处理
- 挂一些get方法上去
- saveAsPng 路径不存在时的错误
- 发布到npm