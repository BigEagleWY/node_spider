var request = require("request");
var cheerio = require("cheerio");
var io = require('jsonio');

var github = {
  dataPath: './data/data.json',
  get: function(url, keyword) {
    if (url.indexOf('github.com') != -1) {
      url = 'https://github.com/search?q=' + keyword
    }
    request(url, function(err, response, body) {
      if (!err && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var result = $('.repo-list-item');
        var resultName = '';
        var group = [];
        io.write(github.dataPath, {
          'url': url
        });
        for (var r = 0; r < result.length; r++) {
          resultName = result.eq(r).find("h3 a").attr("href");
          group.push({
            'name':resultName
          });
        }
        io.append(github.dataPath,group);

      }
    });
  }

};

module.exports = github;
