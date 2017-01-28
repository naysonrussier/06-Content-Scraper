/*
Variables:
They have nearly all the same meaning as those in the scraper.js exepect :
values, that will hold a json format of all the information of the tshirts.
*/
var http = require('http');
var cheerio = require('cheerio');
var Csv = require("./csv.js");
var log = require("./log.js");
var urls = "http://www.shirts4mike.com";
var values = [];

//This function will grab all the informations of the tshirts.
//It will send a request the the URL asked in the scraper.js
function ExtractTshirtData(URL, length) {
  //Send the request
  var request = http.get(urls + "/" + URL, function(response) {
    var value = {"Title":"", "Price":"", "ImageURL":"", "URL":"", "Time":""};
    var date;
    var $;
    response.on('data', function (chunk) {
      $ = cheerio.load(chunk);
    }); 
    response.on('end', function() {
      //This will fill the value object with the tshirt informations
        date = new Date();
        value.Price = $('.price').text();
        $('.price').remove();
        value.Title = $('.shirt-details h1').text().replace(",","").substring(1);
        value.ImageURL = urls + '/' + $('.shirt-picture img').attr("src");
        value.URL = urls + response.client._httpMessage.path;
        value.Time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      //It will the push the value object to the values variable, to create the json.
        values.push(value);
      //When all the tshirts have been retrieved, it will create the csv.
        if (values.length == length) {
          Csv.CreateCsv(values);
        }
 
    });
  });
  //On error, a message will be shown
  request.on('error', function(error) {
      log.log("error","An error occured while fetching the details of a tshirt. (Details : "+error+")");
  });
}


module.exports.ExtractTshirtData = ExtractTshirtData;

