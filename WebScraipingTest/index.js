const client = require('cheerio-httpcli');

const url = 'https://docs.google.com/spreadsheets/d/1e8Ott5IfoyXaOcaGQfEW4gxbylA89mF9SB2An2M3gFY/edit#gid=1088598455';
const oki_url = 'https://toolassisted.github.io/OKI/#RYU/55/6/6/1,0,,0,/1,0,,0,/1,0,,0,/1,0,,0,/1,0,,0,/1,0,,0,/1,0,,0,/'; 

client.fetch(url, {}, function (err, $, res, body) {
  console.log(body);
});