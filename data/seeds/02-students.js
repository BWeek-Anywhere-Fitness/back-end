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
            student_password: "Donuts123",
          },
          {
            student_name: "Marge",
            student_email: "marge@springfield.com",
            student_password: "hrmmm...",
          },
          {
            student_name: "Bart",
            student_email: "bart@springfield.com",
            student_password: "Cowabunga!",
          },
          {
            student_name: "Lisa",
            student_email: "lisa@springfield.com",
            student_password: "LibertyandJustice",
          },
          {
            student_name: "Maggie",
            student_email: "maggie@springfield.com",
            student_password: "geniusbaby",
          },
        ])
        .then(() => console.log("\n== Seed data for students table added."));
    });
};
