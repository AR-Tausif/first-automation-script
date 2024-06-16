import puppeteer from "puppeteer"; // or import puppeteer from 'puppeteer-core';

const run = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let query = "how to scrape google";
  console.log("query :", query);
  // Navigate the page to a URL.
  await page.goto("https://www.google.com/search?q=" + query, {
    waitUntil: "load",
    timeout: 0,
  });

  let numResult = await page.evaluate(() => {
    let i = 0;
    document.getElementById("rso").childNodes.forEach((element) => {
      if (element.tagName == "DIV") {
        i++;
      }
    });
    return i;
  });
  console.log("result", numResult);

  //   // Set screen size.
  //   await page.setViewport({ width: 1080, height: 1024 });

  //   // Type into search box.
  //   await page.type(
  //     ".devsite-search-field",
  //     "Who is Abu Taher in Bangladesh automation developer?"
  //   );

  //   // Wait and click on first result.
  //   const searchResultSelector = ".devsite-result-item-link";
  //   await page.waitForSelector(searchResultSelector);
  //   await page.click(searchResultSelector);

  //   // Locate the full title with a unique string.
  //   const textSelector = await page.waitForSelector(
  //     "text/Customize and automate"
  //   );
  //   const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  //   // Print the full title.
  //   console.log('The title of this blog post is "%s".', fullTitle);

  //   let result = [];
  //   for (let index = 1; index <= numResult; index++) {
  //     const res = await page.select();
  //     console.log(res);
  //   }

  await browser.close();
};

run().catch(console.error);
