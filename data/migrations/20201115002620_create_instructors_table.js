exports.up = function (knex) {
  return knex.schema.createTable("instructors", (tbl) => {
    tbl.increments();
    tbl.string("instructor_email", 256).notNullable().unique();
    tbl.string("instructor_password", 256).notNullable();
    tbl.string("instructor_name", 256).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("roles").dropTableIfExists("users");
};
