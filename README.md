#PDF转语音
pdftovoice
## 环境
macOS
node 8.0.0
系统依赖
```
brew install imagemagick
brew install graphicsmagick
brew install ghostscript
```

```

```
node依赖
```
npm i pdf2pic
```
## 步骤
- pdf 转图片
- 图片转文字
- 文字转语音

### 测试
pdf 转图片：
```
//批量把pdf转化为图片
converter.convertBulk("xin.pdf", -1)
```
图片转文字
```
node src getToken.js
node src getText.js
```
文字转语音

## 参考文档
[百度AI开放API](https://console.bce.baidu.com/#/index/overview)