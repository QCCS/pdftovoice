//pdf转图片
var PDF2Pic = require('pdf2pic').default;
var converter = new PDF2Pic({
    density: 100,           // output pixels per inch
    savename: "pdf",   // output file name
    savedir: "./images",    // output file location
    format: "png",          // output file format
    size: 2000               // output size in pixels
})

//默认转化第一页
// converter.convert("xin.pdf")
//     .then(resolve => {
//     console.log("image converted successfully")
// })
//转化全部
converter.convertBulk("xin.pdf", -1)
