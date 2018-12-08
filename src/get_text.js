/**
 * Created by zhouli on 2018/12/8
 */
var https = require('https');
var qs = require('querystring');
var fs = require('fs');
// 识别图片
var options = {
    "method": "POST",
    "hostname": "aip.baidubce.com",
    "port": null,
    "path": "/rest/2.0/ocr/v1/general_basic?access_token=24.4ee44aaec1cc7eb7c7a2fcf22853932d.2592000.1546829332.282335-15093367",
    "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
    }
};

var req = https.request(options, function (res) {
    var chunks = [];
    res.on("data", function (chunk) {
        chunks.push(chunk);
    });
    res.on("end", function () {
        var body = Buffer.concat(chunks);
        fs.writeFileSync('text.txt',body.toString());
        console.log(body.toString());
    });
});
req.write(qs.stringify({ url: 'http://47.100.13.168:8111/untitled_4.png' }));
req.end();