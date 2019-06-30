const db = require("../db");
const migrate = require("./migrate");

async function wipe() {
  q = `    
    DROP TABLE IF EXISTS migrations;      
    `;

  await db.execute(q);
  migrate.apply_migrations();
}

wipe();
