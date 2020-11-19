const router = require("express").Router();
const Classes = require("../data/models/class-model");
const protected = require("../auth/protected-middleware.js"); // add protected routes middleware after validation middlewares
// next update: check admin or instructor_id/student_id

const currentTime = new Date().toTimeString();

// GET - Test
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Classes Endpoint " + currentTime });
});

// GET - All classes - WORKS
router.get("/", (req, res, next) => {
  Classes.findClasses()
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on getting classes." });
    });
});

// GET - A Class - WORKS
router.get("/:id", validateClassId, (req, res, next) => {
  Classes.findClass(req.params.id)
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on getting class by ID" });
    });
});

// GET - All students in a class
router.get("/:id/students", protected, (req, res, next) => {
  Classes.findStudentsByClass(req.params.id)
    .then((studentList) => {
      res.status(200).json(studentList);
    })
    .catch((err) => {
      console.log(err);
      next({
        code: 500,
        message: "Crashed on getting students by class's ID",
      });
    });
});

// POST - A student to a class
// need to validate class_id, student_id,
// save numStudent, check max students, already signed up, then post
router.post(
  "/:id/students",
  protected,
  validateClassId,
  async (req, res, next) => {
    try {
      const studentArray = await Classes.findStudentsByClass(req.params.id);
      const classObject = await Classes.findClass(req.params.id);

      // check if not at max students
      if (studentArray.length >= classObject.class_maxStudents) {
        res.status(400).json({ message: "Class is already at max size." });
      } else if (
        // check if student doesn't exist
        studentArray.filter(
          (student) => student.student_id === req.body.student_id
        ).length > 0
      ) {
        res
          .status(400)
          .json({ message: "Student is already registered for the class." });
      } else {
        const newStudent = await Classes.addStudentToClass(
          req.body.student_id,
          req.params.id
        );
        res.status(200).json({
          message: `Successfully added Student ${req.body.student_id} to Class ${req.params.id}`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// PUT - Update a class
router.put(
  "/:id",
  validateClassBody,
  protected,
  validateClassId,
  (req, res, next) => {
    Classes.updateClass(req.params.id, req.body).then((updatedClass) => {
      res.status(200).json({ message: "Successfully updated class info!" });
    });
  }
);

// DELETE - Delete a class
router.delete("/:id", protected, validateClassId, (req, res, next) => {
  Classes.deleteClass(req.params.id).then((deletedClass) => {
    res.status(200).json({ message: "Successfully deleted class!" });
  });
});

// DELETE - From a student to a class
router.delete(
  "/:id/students",
  protected,
  validateClassId,
  async (req, res, next) => {
    try {
      const studentArray = await Classes.findStudentsByClass(req.params.id);

      // check if student exists
      if (
        studentArray.filter(
          (student) => student.student_id === req.body.student_id
        ).length === 0
      ) {
        res
          .status(400)
          .json({ message: "Student was already not in the class." });
      } else {
        const delID = await Classes.findClassStudentID(
          req.body.student_id,
          req.params.id
        );
        console.log("delID: ", delID[0]);
        const delStudent = await Classes.delStudentFromClass(delID[0].id);
        res.status(200).json({
          message: `Successfully deleted student ${req.body.student_id} from Class ${req.params.id}`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

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

function validateClassId(req, res, next) {
  Classes.findClass(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Invalid Class ID" });
      } else {
        res.id = data;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on Validating Class ID" });
    });
}

// Middleware - Error Handling
router.use((err, req, res, next) => {
  console.log("ERR", err);
  res.status(500).json({ message: err.message });
});

module.exports = router;
