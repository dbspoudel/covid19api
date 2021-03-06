const axios = require("axios");
const cheerio = require("cheerio");
const siteUrl = "https://heoc.mohp.gov.np/";
const data = [];

const fetchData = async () => {
   const options = { headers: {'Origin': 'https://heoc.mohp.gov.np/'}};
   const response = await axios.get(siteUrl, options);
   return cheerio.load(response.data);
}

const getResults = async () => {
  try {
       const resultKeys = ["sn", "published_date", "title", "size", "download_url"];
       console.log("fetching data");
       // const $ = cheerio.load(response.data);
       const $ = await fetchData();
       $('#health-emergency tr').each((index, element) => {
       var j = 0;
       var objectResponse = {};
       $(element).find('td').each((index, element) => {
         if(j == 4) {
           objectResponse[resultKeys[j]] = $(element).find('a').attr('href');
         } else {
           objectResponse[resultKeys[j]] = $(element).text();
         }
         j++;
       });
       // console.log(objectResponse);
       data.push(objectResponse);
    });
       data.shift();
       return data;
    }
  catch(error) {
    return error;
  }
}

const getWHOData = async() => {
  try {
    const whoSiteResponse = await axios.get("https://experience.arcgis.com/experience/685d0ace521648f8a5beeeee1b9125cd");
    console.log("whoscrap status", whoSiteResponse.status);
    const $ = cheerio.load(whoSiteResponse.data);
    $('nav .feature-list').each((index, element) => {
      console.log($(element).text());
    });
    return "working";
  } catch(error) {
    return error;
  }
}

module.exports = {
   getResults,
   getWHOData
  }