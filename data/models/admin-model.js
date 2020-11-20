const db = require("../config");

module.exports = {
  findAdminBy,
};

function findAdminBy(filter) {
  return db("admins").where(filter).orderBy("id");
}
