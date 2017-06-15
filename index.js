var github = require('./github/github.js');

var url = 'https://github.com';
var keyword = 'react';
github.get(url, keyword);
