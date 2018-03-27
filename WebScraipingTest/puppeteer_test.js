const puppeteer = require('puppeteer');
const url = 'https://docs.google.com/spreadsheets/d/1e8Ott5IfoyXaOcaGQfEW4gxbylA89mF9SB2An2M3gFY/edit#gid=1088598455';

async function getData(page, url){
  await page.goto(url); // ページへ移動
  // 任意のJavaScriptを実行
  return await page.evaluate(() => document.getElementsByClassName('FRAMES'));
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