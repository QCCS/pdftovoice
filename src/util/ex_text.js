/**
 * Created by zhouli on 2018/12/8
 * 解析返回的文本
 */

function get_text(res) {
    var t = JSON.parse(res);
    var arr = [];
    for (let i = 0; i < t.words_result.length; i++) {
        arr.push(t.words_result[i].words)
    }
    return arr;
}


module.exports = {
    get_text: get_text
};
