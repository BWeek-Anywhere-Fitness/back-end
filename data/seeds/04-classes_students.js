exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("classes_students")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("classes_students")
        .insert([
          { class_id: 1, student_id: 1 },
          { class_id: 1, student_id: 2 },
          { class_id: 2, student_id: 1 },
          { class_id: 2, student_id: 3 },
          { class_id: 4, student_id: 1 },
          { class_id: 4, student_id: 2 },
          { class_id: 4, student_id: 5 },
        ])
        .then(() =>
          console.log("\n== Seed data for classes-students table added.")
        );
    });
};
