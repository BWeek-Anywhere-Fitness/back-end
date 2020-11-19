const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("instructors")
    .del()
    .then(function () {
      return knex("instructors")
        .insert([
          {
            instructor_name: "Mario",
            instructor_email: "mario@mushroomkingdom.com",
            instructor_password: bcrypt.hashSync("Luigi123", 8),
          },
          {
            instructor_name: "Link",
            instructor_email: "link@hyrule.com",
            instructor_password: bcrypt.hashSync("Zelda99", 8),
          },
          {
            instructor_name: "Lara Croft",
            instructor_email: "lara@tombs.com",
            instructor_password: bcrypt.hashSync("ilovedanger96", 8),
          },
        ])
        .then(() => console.log("\n== Seed data for instructors table added."));
    });
};
