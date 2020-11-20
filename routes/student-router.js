const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../auth/secrets");

const Students = require("../data/models/student-model");
const protected = require("../auth/protected-middleware.js");
// add protected routes middleware after validation middlewares
// next update: check admin or student_id

function makeToken(student) {
  const payload = {
    role: "student",
    id: student.id,
  };
  const options = {
    expiresIn: "7 days",
  };
  return jwt.sign(payload, jwtSecret, options);
}

// GET - Test - WORKS
router.get("/test", (req, res) => {
  res
    .status(200)
    .json({ message: "Students Endpoint " + new Date().toTimeString() });
});

// GET - All students - WORKS
router.get("/", protected, (req, res, next) => {
  // Check role on token
  console.log(req.decoded);
  if (req.decoded.role === "admin") {
    Students.findStudents()
      .then((profile) => {
        res.status(200).json(profile);
      })
      .catch((err) => {
        console.log(err);
        next({ code: 500, message: "Crashed on getting students." });
      });
  } else {
    res.status(401).json({
      message: "Your token doesn't have the authorization to do this.",
    });
  }
});

// GET - A Student - WORKS
router.get("/:id", protected, validateStudentId, (req, res, next) => {
  console.log(req.params.id);
  if (
    req.decoded.role === "admin" ||
    (req.decoded.role === "student" && req.decoded.id == req.params.id)
  ) {
    Students.findStudent(req.params.id)
      .then((profile) => {
        res.status(200).json(profile);
      })
      .catch((err) => {
        console.log(err);
        next({ code: 500, message: "Crashed on getting student by ID" });
      });
  } else {
    res.status(401).json({
      message: "Your token doesn't have the authorization to do this.",
    });
  }
});

// GET - All classes for a student
router.get("/:id/classes", protected, validateStudentId, (req, res, next) => {
  if (
    req.decoded.role === "admin" ||
    (req.decoded.role === "student" && req.decoded.id == req.params.id)
  ) {
    Students.findClassesByStudent(req.params.id)
      .then((classList) => {
        res.status(200).json(classList);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(401).json({
      message: "Your token doesn't have the authorization to do this.",
    });
  }
});

// POST - Student Login
router.post("/login", (req, res, next) => {
  const { student_email, student_password } = req.body;
  Students.findStudentBy({ student_email: student_email })
    .then(([student]) => {
      console.log(student);
      if (
        student &&
        bcryptjs.compareSync(student_password, student.student_password)
      ) {
        const token = makeToken(student);
        res.status(200).json({
          message: `Successful login by ${student_email}`,
          student_id: student.id,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid student credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// POST - A New Student - WORKS
router.post("/new", validateStudentBody, (req, res, next) => {
  if (!req.body.student_name) {
    res.status(400).json({
      message: "Missing required student_name in request body",
    });
  }
  const credentials = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(credentials.student_password, rounds);
  credentials.student_password = hash;
  console.log("hashed credentials: ", credentials);

  Students.addStudent(credentials)
    .then((newStudent) => {
      res.status(201).json({ message: "Successfully created new student!" });
    })
    .catch((err) => {
      if (err.errno === 19) {
        res.status(400).json({
          message: "Email has already been registered!",
        });
      }
      next({
        code: 500,
        message: "Crashed on registering student",
      });
    });
});

// PUT - Update a student's info - WORKS
router.put(
  "/:id",
  validateStudentBody,
  protected,
  validateStudentId,
  (req, res, next) => {
    if (!req.body.student_name) {
      res.status(400).json({
        message: "Missing required student_name in request body",
      });
    }
    if (
      req.decoded.role === "admin" ||
      (req.decoded.role === "student" && req.decoded.id == req.params.id)
    ) {
      Students.updateStudent(req.params.id, req.body)
        .then((updatedStudent) => {
          res
            .status(200)
            .json({ message: "Successfully updated student info!" });
        })
        .catch((err) => {
          if (err.errno === 19) {
            res.status(400).json({
              message: "Email has already been registered!",
            });
          }
        });
    } else {
      res.status(401).json({
        message: "Your token doesn't have the authorization to do this.",
      });
    }
  }
);

// DELETE - Delete a student - WORKS
router.delete("/:id", protected, validateStudentId, (req, res, next) => {
  if (
    req.decoded.role === "admin" ||
    (req.decoded.role === "student" && req.decoded.id == req.params.id)
  ) {
    Students.deleteStudent(req.params.id).then((deletedStudent) => {
      res.status(200).json({ message: "Successfully deleted student!" });
    });
  } else {
    res.status(401).json({
      message: "Your token doesn't have the authorization to do this.",
    });
  }
});

// Middleware - Error Handling
router.use((err, req, res, next) => {
  console.log("ERR", err);
  res.status(500).json({ message: err.message });
});

// Middleware - Validates Student's ID
function validateStudentId(req, res, next) {
  Students.findStudent(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Invalid Student ID" });
      } else {
        res.id = data;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on Validating Student ID" });
    });
}

// Middleware - Validates Student's Info
function validateStudentBody(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "Missing student data",
    });
  } else if (!req.body.student_email || !req.body.student_password) {
    res.status(400).json({
      message:
        "Missing required student_email and/or student_password in request body",
    });
  } else {
    next();
  }
}

module.exports = router;
