const db = require("../config");

// create functions for your endpoints

module.exports = {
  // function names
  findClasses,
  findClass,
};

function findClasses() {
  return db("classes as c")
    .join("instructors as i", "i.id", "c.instructor_id")
    .select(
      "c.id",
      "c.class_name",
      "i.instructor_name",
      "c.class_type",
      "c.class_start",
      "c.class_duration",
      "c.class_intensity",
      "c.class_location",
      "c.class_numStudents",
      "c.class_maxStudents"
    );
}

function findClass(classid) {
  return db("classes as c")
    .join("instructors as i", "i.id", "c.instructor_id")
    .select(
      "c.id",
      "c.class_name",
      "i.instructor_name",
      "c.class_type",
      "c.class_start",
      "c.class_duration",
      "c.class_intensity",
      "c.class_location",
      "c.class_numStudents",
      "c.class_maxStudents"
    )
    .where({ "c.id": classid })
    .first();
}
