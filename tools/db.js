"use strict";

const config = require("../config.json");
const mysql = require("mysql");

async function create_connection() {
  const connection = await mysql.createConnection({
    host: config.db.connection.host,
    user: config.db.connection.user,
    password: config.db.connection.password,
    database: config.db.schema.name
  });

  // const conn = await pool.getConnection();
  await connection.beginTransaction();
  return connection;
}

async function execute(sql, param = null, conn = null) {
  if (conn == null) {
    conn = await create_connection();
  }

  return new Promise((resolve, reject) => {
    conn.query(sql, param, function(err, result, fields) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

async function commit(conn) {
  try {
    await conn.commit();
  } catch (e) {
    console.log(e);
  }
}

async function rollback(conn) {
  console.log("rollback");

  await conn.rollback();
}

exports.execute = execute;
exports.commit = commit;
exports.create_connection = create_connection;
exports.rollback = rollback;
