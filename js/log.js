/*
Variables:
fs, will help working with files;
folder is the location of the "logs" folder
*/
var fs = require('fs');
var folder = "./logs/";

//This will log the message to a file, scraper-error.log, or scraper.log,
//depending on the value of "type" ('error', or 'success')
function log(type, message) {
    var date = new Date();
    var file;
  //check the type of the message
  if(type === "error") {
    file = 'scraper-error.log';
  } else {
    file = 'scraper.log';
  }
  //Check if folder "logs" exists
  if (!fs.existsSync(folder)){
    fs.mkdirSync(folder);
    log('success',"Folder 'logs' has been created");
  }
  //write the date, followed by the message
  fs.appendFile(folder + file, '[' + date.toString() + '] ' + message + '\n', function (err) {
    if (err) {
      console.log("An error occured. We were enable to writeinto the scraper-error.log. ("+err+")");
    } else {
      console.log(message);
    }
  });
}

module.exports.log = log;