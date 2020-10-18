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
  const allAnimeData=[];
  const $=cheerio.load(pageContent);
  const rawData=$('div.seasonal-anime-list.js-seasonal-anime-list.js-seasonal-anime-list-key-1.clearfix').first().find('div.seasonal-anime.js-seasonal-anime');
  rawData.each((i,anime)=>{
    let Anime={
      "Anime":$(anime).find('.h2_anime_title').text(),
      "Description":$(anime).find('.synopsis.js-synopsis').text(),
      "Link":$(anime).find('.link-title').attr('href'),
      "Episodes":$(anime).find('.eps').text().trim("\n"),
      "Studio":$(anime).find('.producer').text().trim("\n")
    }
    if($(anime).find('div.image').find('img').attr('data-src')){
      Anime["Poster"]=$(anime).find('div.image').find('img').attr('data-src')
    }else{
      Anime["Poster"]=$(anime).find('div.image').find('img').attr('src')
    }
    allAnimeData.push(Anime);
  });
  console.log(allAnimeData)
})
.catch(err=>console.log(err));