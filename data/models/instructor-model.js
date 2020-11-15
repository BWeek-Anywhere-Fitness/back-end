const db = require("../config");

// create functions for your endpoints

module.exports = {
  // function names
  findInstructors,
  findInstructor,
  findInstructorClasses,
  addInstructor,
  updateInstructor,
  deleteInstructor,
  addClass,
  updateClass,
  // deleteClass,
};

function findInstructors() {
  return db("instructors");
}

function findInstructor(id) {
  return db("instructors").where({ id }).first();
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

function updateClass(id, changes) {
  return db("classes").where("id", id).update(changes);
}
