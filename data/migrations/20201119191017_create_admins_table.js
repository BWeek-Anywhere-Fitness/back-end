exports.up = function (knex) {
  return knex.schema.createTable("admins", (tbl) => {
    tbl.increments();
    tbl.string("admin_email", 256).notNullable().unique();
    tbl.string("admin_password", 256).notNullable();
    tbl.string("admin_name", 256).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("admins");
};
