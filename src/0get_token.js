/**
 * Created by zhouli on 2018/12/8
 */
var http = require('https');
var qs = require('querystring');
var fs = require('fs');

var options = {
    "method": "GET",
    "hostname": "aip.baidubce.com",
    "port": null,
    "path": "/oauth/2.0/token?grant_type=client_credentials&client_id=NN16yVeLHTUjtGwjOlKMMuLv&client_secret=Hb8pOpWHbys1ZZR8pXZYdk97qDzOLuWZ",
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
        fs.writeFileSync('token.txt',body.toString());
        console.log(body.toString());
    });
});
req.write(qs.stringify());
req.end();