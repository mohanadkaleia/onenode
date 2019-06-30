const db = require("../../tools/db");

async function create(name, user_id) {
  q = `
    INSERT INTO connection 
    (name, user_id)
    VALUES
    (:name, :user_id)
    `;
  param = { name: name, user_id: user_id };
  await db.execute(q, param);
}
async function update(id, name = null, user_id = null) {
  q = `
    UPDATE connection 
    SET 
    name=:name, 
    user_id=:user_id    
    WHERE id=:id
  `;
  param = { id: id, name: name, user_id: user_id };
  await db.execute(q, param, conn);
  await db.commit();
}

exports.create = create;
exports.update = update;
