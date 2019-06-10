"use strict";

const fs = require("fs");
const path = require("path");
const dir = "tools/migrations/";
const logger = require("winston");
const db = require("../db");

let MIGRATION_SCHEMA = `
    CREATE TABLE migrations
    (
        id int,
        name text,
        created timestamp
    );`;

function apply_migrations() {
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
              db.execute(query, function(err, rows) {
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
    });
  });
}

function get_db_migrations(callback) {
  db.execute("select * from migrations", function(err, rows) {
    if (err) {
      logger.info("Creating migrations table...");
      db.execute(MIGRATION_SCHEMA, function(err, rows) {
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
    db.execute(queries[i], function(err, rows) {
      if (err) {
        logger.info(err);
        callback(err);
      }
    });
  }
  callback(false);
}

apply_migrations();
