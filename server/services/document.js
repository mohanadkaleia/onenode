let db = require("../../tools/db");

async function create(name, path, node_id) {
  q = `
    INSERT INTO file 
    (name, path, node_id)
    VALUES
    (:name, :path, :node_id)
    `;
  param = { name: name, path: path, node_id: node_id };

  try {
    await db.execute(q, param);
  } catch (err) {
    console.log(err);
  }
}
async function update(id, name = null, node_id = null, path = null) {
  q = `
    UPDATE file 
    SET 
    name=${name}, 
    path=${path}, 
    node_id=${node_id}
  `;
  await db.execute(q);
}
try {
  create("mohanad", "data/temp", "1");
} catch (e) {
  console.log(e);
}

exports.create = create;
exports.update = update;
