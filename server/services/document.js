const db = require("../../tools/db");

async function create(name, path, connection_id) {
  q = `
    INSERT INTO document 
    (name, path, connection_id)
    VALUES
    (:name, :path, :connection_id)
    `;
  param = { name: name, path: path, connection_id: connection_id };
  await db.execute(q, param);
}
async function update(id, name = null, connection_id = null, path = null) {
  q = `
    UPDATE document 
    SET 
    name=:name, 
    path=:path, 
    connection_id=:connection_id
    WHERE id=:id
  `;
  param = { id: id, name: name, path: path, connection_id: connection_id };
  await db.execute(q, param, conn);
  await db.commit();
}

exports.create = create;
exports.update = update;
