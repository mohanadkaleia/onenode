const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./db/onenode.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the database3 SQlite database.');
});

addFile = function (file_name, file_path, created_date) {
  var query = "INSERT INTO File (name, path, created_date) VALUES (?, ?, ?)";
  console.log(query);
  db.serialize(function() {
    db.run(query, [file_name, file_path, created_date], function(err) {
      if (err) {
        throw err;
      } else {
        console.log("Query has been executed");
      }
    });
  });
}

selectFiles = function (file_name = '', file_path = '', callback) {
  let sql = 'SELECT * FROM File';

  db.all(sql, [], (err, callback) => {
    if (err) {
      throw err;
    } else {
      console.log("select query has been executed");
    }
  });
}

deleteFile = function ()

//db.close();

module.exports = {
    addFile: addFile,
    selectFiles: selectFiles
}
