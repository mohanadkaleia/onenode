const readChunk = require('read-chunk');
const fileType = require('file-type');
const fs = require('fs');
const testFolder = 'tmp/';

var file_list = []

// This function returns files and folder inside a directory
var listFiles = function (directory, callback) {
  file_list = []
  fs.readdir(directory, (err, files) => {
    file_counter = 0;
    files.forEach(file => {
      getFileStatus(directory + file, function(file_info) {
        file_list.push(file_info);
        file_counter++;
        if (file_counter === files.length) {
          // TODO return file list in a callback as an API output
          callback(file_list);
        }
      });
    });
  })
}

var getFileStatus = function(filename, callback) {
  fs.stat(filename, function (err, stats) {
    if (err)
       throw err;
    if (stats.isFile()) {
      file_information = getFileType(filename)
    }
    if (stats.isDirectory()) {
      // If the file is actually a dicrectory return its type as a directory
      file_information = {name: filename, ext: 'directory', mime: undefined}
    }
    callback(file_information)
  });
}

var getFileType = function(filename) {
  // Read the first 4100 byte of the file to know what type is it
  var buffer = readChunk.sync(filename, 0, 4100);
  var type = fileType(buffer);

  // If the type is null then it is not supported
  if (type !== null) {
    file_information = {name: filename, ext: type.ext, mime: type.mime}
  } else {
    file_information = {name: filename, ext: undefined , mime: undefined}
  }
  return file_information
}


module.exports = {
    listFiles: listFiles
}
// For test
// listFiles(testFolder, function(files) {});
