var github = require('./github/github.js');

var host = 'https://github.com/';
var keyword = 'react';
var url ="";
var i=0;
var timer = setInterval(function(){
    i++;
    url = host+"search?q="+keyword+"&p="+i;
    console.log("page "+i);
    github.get(url);
    if(i>=10){
        clearInterval(timer);
    }

},5000);


