exports.seed = function (knex) {
  return knex("instructors")
    .del()
    .then(function () {
      return knex("instructors")
        .insert([
          {
            instructor_name: "Mario",
            instructor_email: "mario@mushroomkingdom.com",
            instructor_password: "Luigi123",
          },
          {
            instructor_name: "Link",
            instructor_email: "link@hyrule.com",
            instructor_password: "Zelda99",
          },
          {
            instructor_name: "Lara Croft",
            instructor_email: "lara@tombs.com",
            instructor_password: "ilovedanger96",
          },
        ])
        .then(() => console.log("\n== Seed data for instructors table added."));
    });
};
