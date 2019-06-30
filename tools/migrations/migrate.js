"use strict";

const fs = require("fs");
const path = require("path");
const dir = "tools/migrations/";
const logger = require("winston");
const db = require("../db");

let conn;

let MIGRATION_SCHEMA = `
    CREATE TABLE migrations
    (
        id int,
        name text,
        created timestamp
    );`;

async function get_db_migrations() {
  try {
    let rows = await db.execute("select * from migrations");
    let commited_migrations = rows.map(a => a.name);
    return commited_migrations;
  } catch (err) {
    logger.info("Creating migrations table...");
    await db.execute(MIGRATION_SCHEMA, null, conn);
    return [];
  }
}

async function execute_migration(file_name) {
  let content = fs.readFileSync(file_name).toString();
  let queries = content.split(";");

  for (let i in queries) {
    try {
      let q = queries[i].trim();
      if (q.length === 0 || q === "") {
        continue;
      }
      await db.execute(q, null, conn);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}

async function apply_migrations() {
  conn = await db.create_connection();

  let migrations = [];

  fs.readdir(dir, async function(err, items) {
    for (let i = 0; i < items.length; i++) {
      if (path.extname(items[i]) == ".sql") {
        migrations.push(items[i]);
      }
    }

    let committed = await get_db_migrations();

    if (migrations.sort().toString() == committed.sort().toString()) {
      logger.info("Nothing to commit.. yay! 🐣");
      process.exit();
    }

    for (let i = 0; i < migrations.length; i++) {
      if (!committed.includes(migrations[i])) {
        logger.info(`Migrating ${migrations[i]}... 🥝`);

        // Execute migration
        try {
          await execute_migration(__dirname + "/" + migrations[i]);
          let query = `insert into migrations (name, created) values ('${
            migrations[i]
          }', CURRENT_TIMESTAMP());`;
          await db.execute(query, null, conn);
        } catch (err) {
          logger.info(err);
        }
      }
    }
    console.log("Finished! 🚀");

    // Commit changes
    // FIXME: I could not figure how to commit/rollback queries.. it commits automatically
    await db.commit(conn);

    process.exit();
  });
}

// apply_migrations();

exports.apply_migrations = apply_migrations;
