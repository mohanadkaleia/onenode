const db = require("../../tools/db");

async function create(name, path, node_id) {
  q = `
    INSERT INTO file 
    (name, path, node_id)
    VALUES
    (:name, :path, :node_id)
    `;
  param = { name: name, path: path, node_id: node_id };
  await db.execute(q, param);
}
async function update(id, name = null, node_id = null, path = null) {
  q = `
    UPDATE file 
    SET 
    name=:name, 
    path=:path, 
    node_id=:node_id
    WHERE id=:id
  `;
  param = { id: id, name: name, path: path, node_id: node_id };
  await db.execute(q, param, conn);
  await db.commit();
}

exports.create = create;
exports.update = update;
