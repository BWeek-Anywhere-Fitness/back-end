const router = require("express").Router();
const Instructors = require("../data/models/instructor-model");
// const protected = require("../auth/protected-middleware.js");
// add protected middleware after validation middlewares

const currentTime = new Date().toTimeString();

// GET - Test
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Instructors Endpoint " + currentTime });
});

// GET - All instructors - WORKS
router.get("/", (req, res, next) => {
  Instructors.findInstructors()
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on getting instructors." });
    });
});

// GET - An Instructor - WORKS
router.get("/:id", validateInstructorId, (req, res, next) => {
  Instructors.findInstructor(req.params.id)
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on getting instructor by ID" });
    });
});

// GET - All of an Instructor's Classes
router.get("/:id/classes", validateInstructorId, (req, res, next) => {
  Instructors.findInstructorClasses(req.params.id)
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch((err) => {
      console.log(err);
      next({
        code: 500,
        message: "Crashed on getting an instructor's classes",
      });
    });
});

// POST - A New Instructor - WORKS -  Need to reject email same
router.post("/new", validateInstructorBody, (req, res, next) => {
  if (!req.body.instructor_name) {
    res.status(400).json({
      message: "Missing required instructor_name in request body",
    });
  }
  Instructors.addInstructor(req.body).then((newInstructor) => {
    res.status(201).json({ message: "Successfully created new instructor!" });
  });
});

// POST - a New Class - WORKS
router.post(
  "/:id/classes/new",
  validateClassBody,
  validateInstructorId,
  (req, res, next) => {
    Instructors.addClass({ ...req.body, instructor_id: req.params.id }).then(
      (newClass) => {
        res.status(201).json({ message: "Successfully created new class!" });
      }
    );
  }
);

// PUT - Update an instructor's info - Need to reject email same
router.put(
  "/:id",
  validateInstructorBody,
  validateInstructorId,
  (req, res, next) => {
    if (!req.body.instructor_name) {
      res.status(400).json({
        message: "Missing required instructor_name in request body",
      });
    }
    Instructors.updateInstructor(req.params.id, req.body).then(
      (updatedInstructor) => {
        res
          .status(200)
          .json({ message: "Successfully updated instructor info!" });
      }
    );
  }
);

// Update a class
// router.put(
//   "/:id/classes/:id2",
//   validateClassBody,
//    validateClassId
//   validateInstructorId,
//   (req, res, next) => {
//     Instructors.updateClass({ ...req.body, instructor_id: req.params.id }).then(
//       (updatedClass) => {
//         res.status(201).json({ message: "Successfully updated class!" });
//       }
//     );
//   }
// );

// DELETE - Delete an instructor - WORKS
router.delete("/:id", validateInstructorId, (req, res, next) => {
  Instructors.deleteInstructor(req.params.id).then((deletedInstructor) => {
    res.status(200).json({ message: "Successfully deleted instructor!" });
  });
});

// DELETE - A class

// Middleware - Error Handling
router.use((err, req, res, next) => {
  console.log("ERR", err);
  res.status(500).json({ message: err.message });
});

// Middleware - Validates Instructor's ID
function validateInstructorId(req, res, next) {
  Instructors.findInstructor(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Invalid Instructor ID" });
      } else {
        res.id = data;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on Validating Instructor ID" });
    });
}

// Middleware - Validates Instructor's Info
function validateInstructorBody(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "Missing instructor data",
    });
  } else if (!req.body.instructor_email || !req.body.instructor_password) {
    res.status(400).json({
      message:
        "Missing required instructor_email and/or instructor_password in request body",
    });
  } else {
    next();
  }
}

// Middleware - Validates Class Info
function validateClassBody(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "Missing class data",
    });
  } else if (
    !req.body.class_name ||
    !req.body.class_type ||
    !req.body.class_start ||
    !req.body.class_duration ||
    !req.body.class_intensity ||
    !req.body.class_location ||
    !req.body.class_maxStudents
  ) {
    res.status(400).json({
      message:
        "Missing required class_name, class_type, class_start, class_duration, class_intensity, class_location, and/or class_maxStudents in request body",
    });
  } else {
    next();
  }
}

module.exports = router;
