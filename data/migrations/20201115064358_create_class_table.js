exports.up = function (knex) {
  return knex.schema.createTable("classes", (tbl) => {
    tbl.increments();
    tbl
      .integer("instructor_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("instructors")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("class_name", 256).notNullable();
    tbl.string("class_type", 256).notNullable();
    tbl.string("class_start").notNullable();
    tbl.float("class_duration", 256).notNullable();
    tbl.string("class_intensity", 256).notNullable();
    tbl.string("class_location", 256).notNullable();
    tbl.integer("class_numStudents", 256).defaultTo(0).unsigned();
    tbl.integer("class_maxStudents", 256).notNullable().unsigned();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("classes");
};
