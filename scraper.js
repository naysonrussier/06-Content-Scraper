/**********************************************************
                      CONTENT SCRAPER
**********************************************************/

/*
This app will grab all the informations from the "shirts4mike.com" website,
to generate a csv file, containing the tshirt of that website.
*/

/*
Variables :
http, to send a request to "sirts4mike.com";
cheerio, a jquery plugin to grab the needed informations from the http response;
Tshirt, executing Tshirt code for each tshirts found;
log, executing log code;
url, containing the url of the website entry point;
$, workin with the "cheerio" plugin.
*/
var http = require('http');
var cheerio = require('cheerio');
var Tshirt = require("./js/tshirt.js");
var log = require("./js/log.js");
var url = "http://www.shirts4mike.com/shirts.php";
var $;

//Sending a request to the url
var request = http.get(url, function(response) {
  //Thre response is assigned to the "$" variable, for the cheerio plugin
  response.on('data', function (chunk) {
    $ = cheerio.load(chunk);
  });
  
  response.on('end', function() {
    //If the response is OK, then execute the Tshirt code, for all tshirts found with "cheerio".
    //I've also provided an error message if the response code id different of OK
    if(response.statusCode === 200) {
      for (var i = 0; i < $('.products a').length; i +=1) {
        Tshirt.ExtractTshirtData($('.products a').eq(i).attr("href"), $('.products a').length);
      }
    } else {
      log.log("error","The website '" + url + "' send an error. (Details : " + response.statusCode + ", " + response.statusMessage +")");
    }
  });

});

//if the request couldn't happen (no internet, or wrong url...), it will show an error
request.on('error', function(error) {
  log.log("error","There was an error connecting to '" + url + "'. (Details : "+ error +")");
});


