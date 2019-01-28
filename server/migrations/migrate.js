"use strict";
const config = require("./config.json");
const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
const dir = "server/migrations/";
const logger = require("winston");

const connection = mysql.createConnection({
  host: config.connection.host,
  user: config.connection.user,
  password: config.connection.password,
  database: config.schema.name
});

let migration_schema = `
    CREATE TABLE migrations
    (
        id int,
        name text,
        created timestamp
    );`;

connection.connect(function(err) {
  if (!err) {
    logger.info("Database is connected 😆");
    apply_migrations(function(result) {
      if (result) {
        logger.info("Finished migrating.. 😆");
        close_connection();
      }
    });
  } else {
    logger.info("Unable to connect... ☹️");
  }
});

function apply_migrations(callback) {
  let migrations = [];
  fs.readdir(dir, function(err, items) {
    for (let i = 0; i < items.length; i++) {
      if (path.extname(items[i]) == ".sql") {
        migrations.push(items[i]);
      }
    }
    get_db_migrations(function(commited) {
      for (let i = 0; i < migrations.length; i++) {
        if (migrations.sort().toString() == commited.sort().toString()) {
          logger.info("Nothing to commit.. yay! 🐣");
        }
        if (!commited.includes(migrations[i])) {
          logger.info(`Migrating ${migrations[i]}...`);

          // Execute migration
          execute_migration(__dirname + "/" + migrations[i], function(err) {
            if (!err) {
              let query = `insert into migrations (name, created) 
                    values ('${migrations[i]}', CURDATE());`;
              logger.info(query);
              connection.query(query, function(err, rows) {
                if (err) {
                  logger.info(err);
                } else {
                  logger.info(
                    `Migration ${migrations[i]} has been committed 🥝`
                  );
                }
              });
            }
          });
        }
      }
      callback(true);
    });
  });
}

function get_db_migrations(callback) {
  connection.query("select * from migrations", function(err, rows) {
    if (err) {
      logger.info("Creating migrations table...");
      connection.query(migration_schema, function(err, rows) {
        if (err) {
          logger.info(err);
        } else {
          callback([]);
        }
      });
    }
    let commited_migrations = rows.map(a => a.name);
    callback(commited_migrations);
  });
}

function close_connection() {
  connection.end();
}

function execute_migration(file_name, callback) {
  let content = fs.readFileSync(file_name).toString();
  let queries = content.split(";");

  for (let i in queries) {
    let q = queries[i];
    logger.info(q.length);
    logger.info(q);
    if (q.search(";")) {
      logger.info(q);
      continue;
    }
    connection.query(queries[i], function(err, rows) {
      if (err) {
        logger.info(err);
        callback(err);
      }
    });
  }
  callback(false);
}
