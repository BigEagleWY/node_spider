var request = require("request");
var cheerio = require("cheerio");

var github = {
  get: function(url) {
    request(url, function(err, response, body) {
      if (!err && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var result = $('.repo-list-item');
        var resultName = '';
        var group = [];
        for (var r = 0; r < result.length; r++) {
          resultName = result.eq(r).find("h3 a").attr("href");
          console.log(resultName);
        }

      }
    });
  }

};

module.exports = github;
