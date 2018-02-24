var model = require('./model.js');
var dateTime = require('node-datetime');

var dt = dateTime.create();
var dt_formatted = dt.format('Y-m-d H:M:S');


//model.addFile('Test file', './', dt_formatted);
model.selectFiles('', '', function(result) {
  console.log(result);
});
