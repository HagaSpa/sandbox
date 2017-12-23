var GitHubApi = require('github');
var github = new GitHubApi();

// Lambdaのトリガー実行時に実行される
exports.handler = (event, context, callback) => {

  // githubのrepositoriesを検索
  github.search.repos({
    q: 'sitepoint',
    sort: 'stars'
  }, function(err, res){
    if(err){
      callback(err);
    }

    // レスポンスから、data.items.html_urlとdata.items.starsのみ表示するように整形
    var results = res.data.items.map((repo) => {
      return {
        url: repo.html_url,
        stars: repo.stargazers_count
      };
    });

    // コールバック関数。このメソッドが実行された時に、処理終了。
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(results)
    });
  });

};