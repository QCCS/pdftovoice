/**
 * Created by zhouli on 2018/12/8
 */
var qs = require("querystring");
var http = require("http");
var fs = require("fs");
var options = {
    "method": "GET",
    "hostname": "tts.baidu.com",
    "port": null,
    "path": "/text2audio?lan=zh&ie=UTF-8&spd=6&text=asa测试文章转语音",
    "headers": {
        "cache-control": "no-cache"
    }
};

var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        fs.writeFileSync('test.audio',body.toString());
    });
});

req.write(qs.stringify({}));
req.end();