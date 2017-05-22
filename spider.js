var request = require("request");
var cheerio = require("cheerio");



var url  ='https://www.baidu.com';


request(url,function(err,response,body){
	if(!err&&response.statusCode ==200){
		var $ = cheerio.load(body);
		console.log($("input").length);
	}
});