"use strict";

const config = require("../config.json");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: config.db.connection.host,
  user: config.db.connection.user,
  password: config.db.connection.password,
  database: config.db.schema.name
});

function execute(sql, param = null, callback, error) {
  con.connect(function(err) {
    if (err) {
      throw err;
    }
    con.query(sql, param, function(err, result, fields) {
      if (err) error(err);
      close_connection();
      callback(result);
    });
  });
}

function close_connection() {
  con.end();
}

// con.connect(function(err) {
//   if (!err) {
//     logger.info("Database is connected 😆");
//     apply_migrations(function(result) {
//       if (result) {
//         logger.info("Finished migrating.. 😆");
//         close_connection();
//       }
//     });
//   } else {
//     logger.info("Unable to connect... ☹️");
//   }
// });

exports.execute = execute;
