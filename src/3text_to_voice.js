/**
 * Created by zhouli on 2018/12/8
 */
var fs = require('fs');
var AipSpeechClient = require("baidu-aip-sdk").speech;
var ex_text = require('./util/ex_text');
var file_arr = readDirSync('text');

// 设置APPID/AK/SK
var APP_ID = "15094403";
var API_KEY = "qzRYcEBeVBNY5QYKEleFPGDE";
var SECRET_KEY = "UU7Km9I15L0XcZyeHAzTKqG5vv6N6ZGr";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);


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

start(client,'text/',file_arr)
//启动转换函数
function start(client, path, file_arr) {
    for (let i = 0; i < file_arr.length; i++) {
        batchTextConvert(client, path, file_arr[i]);
    }
}

/**
 * 批量将文件转语音
 * @param path  文件目录
 * @param file  文件名称
 */
function batchTextConvert(client, path, file) {
    var data = fs.readFileSync(path + file, 'utf8');
    let textArr = ex_text.get_text(data);
    console.log('-=========-')
    console.log(textArr)
    batchConvert(client, textArr, 'voice/');
}

/**
 * 批量将文字转语音
 * @param client  百度语音合成SDK
 * @param textArr  一个待转换的语言数组
 */
function batchConvert(client, textArr, dir) {
    for (let i = 0; i < textArr.length; i++) {
        convertMp3(client, textArr[i], 'name' + i, dir);
    }
}

/**
 * 将文字转语音
 * @param client  百度语音合成SDK
 * @param textStr  长度不能超过500
 * @param name  语音文件名字
 */
function convertMp3(client, textStr, name, dir) {
    // 语音合成
    client.text2audio(textStr).then(function (result) {
        if (result.data) {
            fs.writeFileSync(dir + name + '.mp3', result.data);
        } else {
            // 服务发生错误
            console.log(result)
        }
    }, function (e) {
        // 发生网络错误
        console.log(e)
    });
}


