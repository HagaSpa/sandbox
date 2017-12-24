"use strict";

const twitter = require('twitter');

// lambda側の環境変数からkey値を取得
const twitter_client = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.handler = (event, context, callback) => {
  let date = new Date();

  twitter_client.post('statuses/update', {
    status: 'TwitterBotテストです。' + date
  }, function(err, tweet, res) {
    if(err) {
      callback(null, 'Twitter bot error.');
    }
    callback(null, 'Twitter bot end.');
  });

};