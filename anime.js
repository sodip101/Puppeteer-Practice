const puppeteer = require('puppeteer');
const cheerio=require('cheerio');
const url = 'https://myanimelist.net/anime/season';

const pageContent=async(url)=>{
  const browser=await puppeteer.launch();
  const newPage=await browser.newPage();
  await newPage.goto(url,{waitUntil:"networkidle2"});
  const pageContent=await newPage.content();

  debugger;
  await browser.close();

  return pageContent;
};

pageContent(url)
.then((pageContent)=>{
  const $=cheerio.load(pageContent);
  const allData=$('div.seasonal-anime-list.js-seasonal-anime-list.js-seasonal-anime-list-key-1.clearfix').first();
  
  
  
  // console.log(allData.find('.anime-header').text());
})
.catch(err=>console.log(err));
