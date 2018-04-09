const puppeteer = require('puppeteer');
const url = 'https://toolassisted.github.io/OKI/#DSM/57/8/8/1,0,,0,/1,0,,0,/1,0,,0,/1,0,,0,/1,0,,0,/1,0,,0,/1,0,,0,/';

async function getData(page, url){
  await page.goto(url, {waitUntil: 'networkidle2',timeout:5000}); // ページへ移動
  // セレクタを指定してデータ取得
  return await page.evaluate(
      () => document.querySelector('body > div.container-fluid > div.frames.index > table > tbody > tr:nth-child(1) > td:nth-child(10)'));
}

!(async() => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const data = await getData(page, url);
    console.log(data);

    browser.close();
  } catch(e) {
    console.error(e);
  }
})()