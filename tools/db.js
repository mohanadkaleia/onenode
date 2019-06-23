"use strict";

const config = require("../config.json");
const mysql = require("mysql");

const con = mysql.createPool({
  host: config.db.connection.host,
  user: config.db.connection.user,
  password: config.db.connection.password,
  database: config.db.schema.name
});

function execute(sql, param = null, callback, error) {
  con.query(sql, param, function(err, result, fields) {
    // close_connection();
    if (err) error(err);
    callback(result);
  });
}

exports.execute = execute;
