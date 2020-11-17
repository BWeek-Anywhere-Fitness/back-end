exports.up = function (knex) {
  return knex.schema.createTable("classes_students", (tbl) => {
    tbl.increments();
    tbl
      .integer("class_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("classes")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");
    tbl
      .integer("student_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("students")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("classes_students");
};
