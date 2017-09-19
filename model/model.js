const sqlite3 = require('sqlite3').verbose();
const datetime = require('node-datetime');

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
  let sql = 'SELECT * FROM File WHERE 1=1';
  if (file_name != '') {
    sql += ` and name = '${file_name}'`;
  }
  if (file_path != '') {
    sql += ` and path = '${file_path}'`;
  }
  db.get(sql, [], (err, result) => {    
    if (err) {
      throw err;
    } else {
      console.log("select query has been executed");
      callback(result);
    }
  });
}

deleteFile = function (id) {
  var query = "UPDATE File SET is_deleted = 1, modified_date = ? WHERE id = ?";
  var dt = datetime.create();
  var current_date = dt.format('Y-m-d H:M:S');
  db.run(query, [current_date, id] , function(err) {
    console.log(query);
    if (err) {
      throw err;
    } else {
      console.log("Update query has been executed");
      console.log(`Row(s) updated: ${this.changes}`);
    }
  });
}

updateFile = function(id, file_name, file_path = '') {
  var dt = dateTime.create();
  var dt_formatted = dt.format('Y-m-d H:M:S');

  var query = `UPDATE File
               SET name = ?, path = ?, modified_date = ?
               WHERE id = ?`;
  db.run(query, [file_name, file_path, dt_formatted, id], function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Update query has been executed");
    }
  });
}

//db.close();

module.exports = {
    addFile: addFile,
    selectFiles: selectFiles,
    deleteFile: deleteFile,
    updateFile: updateFile
}
