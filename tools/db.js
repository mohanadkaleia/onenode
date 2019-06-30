"use strict";

const config = require("../config.json");
const mysql = require("mysql");

async function create_connection() {
  const connection = await mysql.createConnection({
    host: config.db.connection.host,
    user: config.db.connection.user,
    password: config.db.connection.password,
    database: config.db.schema.name,
    debug: false && config.env == "development"
  });

  connection.config.queryFormat = function(query, values) {
    if (!values) return query;
    return query.replace(
      /\:(\w+)/g,
      function(txt, key) {
        if (values.hasOwnProperty(key)) {
          return this.escape(values[key]);
        }
        return txt;
      }.bind(this)
    );
  };

  // const conn = await pool.getConnection();
  await connection.beginTransaction();
  return connection;
}

async function execute(sql, param = null, conn = null) {
  if (conn === null) {
    conn = await create_connection();
  }

  return new Promise((resolve, reject) => {
    conn.query(sql, param, async function(err, result, fields) {
      if (err) {
        await rollback(conn);
        reject(err);
      }
      await commit(conn);
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
  await conn.rollback();
}

exports.execute = execute;
exports.commit = commit;
exports.create_connection = create_connection;
exports.rollback = rollback;
