/*
Variables :
json2csv, is an npm package that will convert the json format into a csv file;
*/
var json2csv = require('json2csv');
var fs = require('fs');
var log = require("./log.js");
var folder = './data';

function CreateCsv(elements) {
  var date = new Date();
  var destination = folder + '/' + date.getFullYear() + '-' + date.getMonth()+1 + '-' + date.getDate() + '.csv';
  var result;
  //Check if the folder exists
  if (!fs.existsSync(folder)){
    fs.mkdirSync(folder);
    log.log('success',"Folder 'data' has been created");
  }
  //convert the json into a csv format, in the result variable, the write it to the csv file.
  //A message will appear and will be log, depending on the success, or error.
  try {
    result = json2csv({ data: elements, quotes: ''});
    fs.writeFile(destination, result, function(err) {
      if (err) {
        log.log("error","An error occured while writing the csv file. (Details : "+err+")");
      } else {
        log.log('success','File saved successfully at '+ destination);
      }
    });
  } catch (err) {
    log.log("error","An error occured while processing the data. (Details : "+err+")");
  }
}

module.exports.CreateCsv = CreateCsv;