const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("students")
        .insert([
          {
            student_name: "Homer",
            student_email: "homer@springfield.com",
            student_password: bcrypt.hashSync("Donuts123", 8),
          },
          {
            student_name: "Marge",
            student_email: "marge@springfield.com",
            student_password: bcrypt.hashSync("hrmmmmmm", 8),
          },
          {
            student_name: "Bart",
            student_email: "bart@springfield.com",
            student_password: bcrypt.hashSync("Cowabunga!", 8),
          },
          {
            student_name: "Lisa",
            student_email: "lisa@springfield.com",
            student_password: bcrypt.hashSync("LibertyandJustice", 8),
          },
          {
            student_name: "Maggie",
            student_email: "maggie@springfield.com",
            student_password: bcrypt.hashSync("geniusbaby", 8),
          },
        ])
        .then(() => console.log("\n== Seed data for students table added."));
    });
};
