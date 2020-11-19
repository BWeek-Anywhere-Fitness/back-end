const db = require("../config");

// create functions for your endpoints

module.exports = {
  // function names
  findInstructors,
  findInstructor,
  findInstructorBy,
  findInstructorClasses,
  addInstructor,
  updateInstructor,
  deleteInstructor,
  addClass,
};

function findInstructors() {
  return db("instructors");
}

function findInstructor(id) {
  return db("instructors").where({ id }).first();
}

function findInstructorBy(filter) {
  return db("instructors").where(filter).orderBy("id");
}

function findInstructorClasses(instructorid) {
  return db("classes").where({ instructor_id: instructorid });
}

function addInstructor(instructor) {
  return db("instructors")
    .insert(instructor, "id")
    .then(([id]) => findInstructor(id));
}

function updateInstructor(id, changes) {
  return db("instructors").where("id", id).update(changes);
}

function deleteInstructor(id) {
  return db("instructors").where("id", id).del();
}

function addClass(fitClass) {
  return db("classes").insert(fitClass, "id");
}
