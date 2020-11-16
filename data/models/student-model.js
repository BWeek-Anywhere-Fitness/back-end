const db = require("../config");

// create functions for your endpoints

module.exports = {
  /// function names
  findStudents,
  findStudent,
  addStudent,
  updateStudent,
  deleteStudent,
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
