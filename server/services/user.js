const db = require("../../tools/db");

async function create(name, email, password) {
  q = `
    INSERT INTO user 
    (name, email, password)
    VALUES
    (:name, :email, :password)
    `;
  param = { name: name, email: email, password: password };
  await db.execute(q, param);
}
async function update(id, name = null, email = null, password = null) {
  q = `
    UPDATE user 
    SET 
    name=:name, 
    email=:email, 
    password=:password
    WHERE id=:id
  `;
  param = { id: id, name: name, email: email, password: password };
  await db.execute(q, param, conn);
  await db.commit();
}

exports.create = create;
exports.update = update;
