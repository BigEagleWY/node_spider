const util = {
    // 去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格 ecDo.trim('  1235asd',1)
    // result：1235asd 这个方法有原生的方案代替，但是考虑到有时候开发PC站需要兼容IE8，所以就还是继续保留
    trim: function (str, type) {
        switch (type) {
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    },
    /*type
 1:首字母大写
 2：首页母小写
 3：大小写转换
 4：全部大写
 5：全部小写
 * */
    //ecDo.changeCase('asdasd',1) result：Asdasd
    changeCase: function (str, type) {
        function ToggleCase(str) {
            var itemText = ""
            str
                .split("")
                .forEach(function (item) {
                    if (/^([a-z]+)/.test(item)) {
                        itemText += item.toUpperCase();
                    } else if (/^([A-Z]+)/.test(item)) {
                        itemText += item.toLowerCase();
                    } else {
                        itemText += item;
                    }
                });
            return itemText;
        }
        switch (type) {
            case 1:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word
                        .substring(0, 1)
                        .toUpperCase() + word
                        .substring(1)
                        .toLowerCase();
                });
            case 2:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word
                        .substring(0, 1)
                        .toLowerCase() + word
                        .substring(1)
                        .toUpperCase();
                });
            case 3:
                return ToggleCase(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    },
    //repeatStr(str->字符串, count->次数) ecDo.repeatStr('123',3) "result：123123123"
    repeatStr: function (str, count) {
        var text = '';
        for (var i = 0; i < count; i++) {
            text += str;
        }
        return text;
    },
    // ecDo.replaceAll('这里是上海，中国第三大城市，广东省省会，简称穗，','上海','广州')
    // result："这里是广州，中国第三大城市，广东省省会，简称穗，"
    replaceAll: function (str, AFindText, ARepText) {
        raRegExp = new RegExp(AFindText, "g");
        return str.replace(raRegExp, ARepText);
    },
    //检查字符串，邮箱，手机号，数字，中文，英文，大小写
    checkType: function (str, type) {
        switch (type) {
            case 'email':
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            case 'phone':
                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
            case 'tel':
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'number':
                return /^[0-9]$/.test(str);
            case 'english':
                return /^[a-zA-Z]+$/.test(str);
            case 'text':
                return /^\w+$/.test(str);
            case 'chinese':
                return /^[\u4E00-\u9FA5]+$/.test(str);
            case 'lower':
                return /^[a-z]+$/.test(str);
            case 'upper':
                return /^[A-Z]+$/.test(str);
            default:
                return true;
        }
    },
    //数组去重
    //保持数组的原顺序，数字和字符串数字不相同
    removeRepeatArray: function (arr) {
        return arr.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });
    },
    // 转为unicode 编码  
    encodeUnicode: function (str) {
        var res = [];
        for (var i = 0; i < str.length; i++) {
            res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
        }
        return "\\u" + res.join("\\u");
    },
    // 解码  
    decodeUnicode: function (str) {
        str = str.replace(/\\/g, "%");
        return unescape(str);
    },
    htmlToString: function (str) {
        var result = '';
        var tempStr = '';
        if (str.indexOf('&#x') != -1) {
            tempStr = str.split('&#x').join('\\u');
            result = util.decodeUnicode(tempStr.split(';').join(''));
        }
        return result;
    },
    encrypt: function (str) {
        var text = util.encodeUnicode(str);
        return text.split('\\u').join('');
    },
    decode: function (str) {
        var text = str;
        var temp = '\\u',
            result = [];
        for (let i = 0; i < text.length; i++) {
            temp += text[i]
            if (i % 4 == 3) {
                result.push(temp);
                temp = '\\u';
            }
        }
        return util.decodeUnicode(result.join(''));
    }
}
module.exports = util;