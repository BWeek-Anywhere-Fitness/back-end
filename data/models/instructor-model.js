const db = require("../config");

// create functions for your endpoints

module.exports = {
  /// function names
  findInstructors,
};

function findInstructors() {
  return db("instructors");
}
