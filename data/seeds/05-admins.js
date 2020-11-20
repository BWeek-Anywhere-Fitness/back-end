const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("admins")
    .del()
    .then(function () {
      return knex("admins")
        .insert([
          {
            admin_name: "Game Master",
            admin_email: "gm@admin.com",
            admin_password: bcrypt.hashSync("TrackTeam8", 8),
          },
        ])
        .then(() => console.log("\n== Seed data for admins table added."));
    });
};
