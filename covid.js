const puppeteer=require('puppeteer');
const url='https://covid19.ekantipur.com/';

const scraper=async()=>{
    let browser=await puppeteer.launch();
    let page=await browser.newPage();

    await page.goto(url,{waitUntil:"networkidle0"});

    let content=await page.evaluate(()=>{
        let allDataArray=Array.from(document.querySelectorAll('table tbody tr td')).map(td=>td.innerText);;
        let nepalIndex=allDataArray.indexOf("Nepal");
        let result={
            "Country": allDataArray[nepalIndex],
            "Details": {
                "Confirmed":allDataArray[nepalIndex+1],
                "Deaths":allDataArray[nepalIndex+2],
                "Recovered":allDataArray[nepalIndex+3],
                "Active":(allDataArray[nepalIndex+1]-allDataArray[nepalIndex+2]-allDataArray[nepalIndex+3]).toString()
            }
        };
        return result;
    });
    debugger;
    await browser.close();

    return content;
}

scraper()
.then(data=>console.log(data))
.catch(err=>console.log(err));