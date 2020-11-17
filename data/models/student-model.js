const db = require("../config");

// create functions for your endpoints

module.exports = {
  /// function names
  findStudents,
  findStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  findClassesByStudent,
};

function findStudents() {
  return db("students");
}

function findStudent(id) {
  return db("students").where({ id }).first();
}

function addStudent(student) {
  return db("students")
    .insert(student, "id")
    .then(([id]) => findStudent(id));
}

function updateStudent(id, changes) {
  return db("students").where("id", id).update(changes);
}

function deleteStudent(id) {
  return db("students").where("id", id).del();
}

//SQLITE VERSION
// select * from classes as c
// join classes_students as cs on cs.class_id=c.id
// join students as s on s.id=cs.student_id
// where s.id=1

function findClassesByStudent(id) {
  return (
    db("classes as c")
      .join("classes_students as cs", "cs.class_id", "c.id")
      .join("students as s", "s.id", "cs.student_id")
      .join("instructors as i", "i.id", "c.instructor_id")
      .where("s.id", id)
      // .pluck("class_id");
      .select(
        "class_id",
        "class_name",
        "class_type",
        "class_start",
        "class_duration",
        "class_intensity",
        "class_location",
        "class_maxStudents",
        "instructor_name"
      )
  );
}
