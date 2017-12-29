var request = require("request");
var cheerio = require("cheerio");
var io = require("jsonio");
var common = require("../lib/common.js");


var jianshu = {
  url: 'https://www.jianshu.com/u/4c8e7a8b3f0c',
  dataUrl: 'data/jianshu.json',
  data: {
    fans: 0,
    article: 0,
    numbers: 0,
    likes: 0,
  },
  search: function () {
    request(jianshu.url, function (err, response, body) {
      if (!err && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var result = $('.main-top .info');
        jianshu.data.fans = result.find('.meta-block').eq(1).find('p').html();
        jianshu.data.article = result.find('.meta-block').eq(2).find('p').html();
        jianshu.data.numbers = result.find('.meta-block').eq(3).find('p').html();
        jianshu.data.likes = result.find('.meta-block').eq(4).find('p').html();
        jianshu.showResult(jianshu.data);
        jianshu.saveResult(jianshu.data);
      }
    });
  },
  showResult: function (data) {
    console.log("粉丝数:" + data.fans);
    console.log("文章数:" + data.article);
    console.log("字数:" + data.numbers);
    console.log("喜欢数:" + data.likes);
  },
  saveResult: function (data) {
    var now = new Date();
    io.append(jianshu.dataUrl, {
      time:now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate(),
      fans:data.fans,
      article:data.article,
      numbers:data.article,
      likes:data.likes
    });
  }

};

module.exports = jianshu;