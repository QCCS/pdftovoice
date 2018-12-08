/**
 * Created by zhouli on 2018/12/8
 */
var https = require('https');
var qs = require('querystring');
var fs = require('fs');
var file_arr = readDirSync('images');
//遍历目录
function readDirSync(path) {
    file_arr = [];
    var pa = fs.readdirSync(path);
    pa.forEach(function (ele, index) {
        var info = fs.statSync(path + "/" + ele);
        if (info.isDirectory()) {
            // readDirSync(path+"/"+ele);
        } else {
            file_arr.push(ele)
        }
    })
    return file_arr;
}
// 参数
var options = (function getOptions() {
    return {
        "method": "POST",
        "hostname": "aip.baidubce.com",
        "port": null,
        "path": "/rest/2.0/ocr/v1/general_basic?access_token=24.4ee44aaec1cc7eb7c7a2fcf22853932d.2592000.1546829332.282335-15093367",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        }
    };
})();

/**
 * 在线网络图片 转文本
 * @param url  url
 * @param targetFileName  目标文件
 */
function imgPathOnline(url, targetFileName) {
    var req = https.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function () {
            var body = Buffer.concat(chunks);
            fs.writeFileSync(targetFileName, body.toString());
            console.log(body.toString());
        });
    });
    req.write(qs.stringify({url: url}));
    req.end();
}

/**
 * 本地图片 转文本
 * @param path  路径
 * @param name  源文件名
 * @param targetFileName  目标文件
 */
function imgPath(path, name, targetFileName) {
    var req1 = https.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function () {
            var body = Buffer.concat(chunks);
            fs.writeFileSync('text/'+targetFileName, body.toString());
        });
    });
    var imageBuf = fs.readFileSync(path + name);
    var imageBase64 = imageBuf.toString("base64");
    req1.write(qs.stringify({image: imageBase64}));
    req1.end();
}
//批量转换图片到文本
function batchConvertImages(file_arr) {
    for(let i=0;i<file_arr.length;i++){
        imgPath('images/', file_arr[i], 'pdf_'+i+'.txt');
    }
}
batchConvertImages(file_arr);

// imgPathOnline('http://47.100.13.168:8111/untitled_4.png','name.txt');
// imgPath('images/', 'pdf_1.png', 'pdf_1.txt');