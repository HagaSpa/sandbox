const fs = require('fs');
const ytdl = require('ytdl-core');

const url = process.argv[2];

// 引数チェック
if (process.argv.length != 3) {
  console.error('以下形式で実行してください');
  console.error('node index.js https:example.com');
  process.exit(1);
}

// 同ディレクトリにtest.mp3というファイルで、音声ファイル化
ytdl(url)
  .pipe(fs.createWriteStream('test.mp3'));