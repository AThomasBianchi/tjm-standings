const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'https://fantasy.espn.com/baseball/league/schedule?leagueId=12577';


(async () => {
  try {
    var browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle0'});
    
    let results = await page.evaluate(() => {
      let teams = document.querySelectorAll('.teamName');
      let scores = document.querySelectorAll('.matchup--table .result-column:not(.header)');
      let results = {}
      
      for (let i = 0; i < teams.length; i++) {
        let matchup = Math.ceil((i + 1)/18);
        if (!results[matchup]) results[matchup] = {};
        results[matchup][teams[i].innerHTML] = parseFloat(scores[i].innerText);
      }
      return results;
    });

    await browser.close();
    fs.writeFile('results.json', JSON.stringify(results), function(err) {
      if (err) throw err;
      console.log('Results saved');
    })
  } catch (err) {
    console.log(error(err));
    await browser.close();

  }
})();

