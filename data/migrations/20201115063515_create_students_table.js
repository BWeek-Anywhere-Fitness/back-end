exports.up = function (knex) {
  return knex.schema.createTable("students", (tbl) => {
    tbl.increments();
    tbl.string("student_email", 256).notNullable().unique();
    tbl.string("student_password", 256).notNullable();
    tbl.string("student_name", 256).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("students");
};
