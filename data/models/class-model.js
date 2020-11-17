const db = require("../config");

// create functions for your endpoints

module.exports = {
  // function names
  findClasses,
  findClass,
  deleteClass,
  updateClass,
  findStudentsByClass,
  addStudentToClass,
  delStudentFromClass,
  findClassStudentID,
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
      "c.class_maxStudents"
    );
}

function findClass(classid) {
  return db("classes as c")
    .join("instructors as i", "i.id", "c.instructor_id")
    .select(
      "c.id",
      "i.id",
      "i.instructor_name",
      "c.class_name",
      "c.class_type",
      "c.class_start",
      "c.class_duration",
      "c.class_intensity",
      "c.class_location",
      "c.class_maxStudents"
    )
    .where({ "c.id": classid })
    .first();
}

function updateClass(classid, changes) {
  return db("classes").where("id", classid).update(changes);
}

function deleteClass(classid) {
  return db("classes").where("id", classid).del();
}

function findStudentsByClass(id) {
  return (
    db("students as s")
      .join("classes_students as cs", "cs.student_id", "s.id")
      .join("classes as c", "c.id", "cs.class_id")
      .where("c.id", id)
      // .pluck("student_id");
      .select("student_id", "student_name")
  );
}

// FOR CLASSES-STUDENTS TABLE
function addStudentToClass(student_id, class_id) {
  return db("classes_students").insert({ student_id, class_id });
}

function delStudentFromClass(classStudentID) {
  return db("classes_students").where("id", classStudentID).del();
}

// SQLITE3 -
// select * from classes_students as cs
// where student_id = 1 and class_id = 4
function findClassStudentID(student_id, class_id) {
  return db("classes_students")
    .where({ student_id: student_id, class_id: class_id })
    .select("id");
}
