const puppeteer=require('puppeteer');
const movieURL='https://www.imdb.com/title/tt0910970/';

const scraper=async()=>{
    let browser=await puppeteer.launch();
    let page=await browser.newPage();

    await page.goto(movieURL,{waitUntil:"networkidle2"});

    let data=await page.evaluate(()=>{

        let title=document.querySelector('div[class="title_wrapper"]>h1').innerText;
        let rating=document.querySelector('span[itemprop="ratingValue"]').innerText;

        return {
            "title":title,
            "IMDB Rating": rating
        }
    });
    
    debugger;
    await browser.close();   

    return data;
};

scraper()
.then(data=>console.log(data))
.catch(err=>console.log(err))
