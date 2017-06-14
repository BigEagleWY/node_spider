var request = require("request");
var cheerio = require("cheerio");
var io = require('jsonio');

var url  ='https://www.baidu.com';

request(url,function(err,response,body){
	if(!err&&response.statusCode ==200){
		var $ = cheerio.load(body);
		io.append('./data/data.json',{
			"input":$("input").length
		});
	}
});