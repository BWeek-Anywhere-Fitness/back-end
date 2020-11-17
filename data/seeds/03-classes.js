exports.seed = function (knex) {
  return knex("classes")
    .del()
    .then(function () {
      return knex("classes")
        .insert([
          {
            instructor_id: 1,
            class_name: "Jump 101",
            class_type: "Platformer",
            class_start: "Saturdays 10:00 AM",
            class_duration: 1.5,
            class_intensity: "Medium",
            class_location: "Mushroom Kingdom",
            class_maxStudents: 16,
          },
          {
            instructor_id: 1,
            class_name: "Jump 201",
            class_type: "Platformer",
            class_start: "Sundays 10:00 AM",
            class_duration: 2,
            class_intensity: "High",
            class_location: "Mushroom Kingdom",
            class_maxStudents: 10,
          },
          {
            instructor_id: 2,
            class_name: "Sword Fighting",
            class_type: "Adventure",
            class_start: "Tuesdays 6:00 PM",
            class_duration: 2,
            class_intensity: "Low",
            class_location: "Hyrule",
            class_maxStudents: 8,
          },
          {
            instructor_id: 3,
            class_name: "Tomb Raiding",
            class_type: "Platformer",
            class_start: "Mondays 5:30 AM",
            class_duration: 4,
            class_intensity: "Extreme",
            class_location: "Cambodia",
            class_maxStudents: 4,
          },
        ])
        .then(() => console.log("\n== Seed data for classes table added."));
    });
};
