const router = require("express").Router();
const Classes = require("../data/models/class-model");

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

// PUT - Update a class
router.put("/:id", validateClassBody, validateClassId, (req, res, next) => {
  Classes.updateClass(req.params.id, req.body).then((updatedClass) => {
    res.status(200).json({ message: "Successfully updated class info!" });
  });
});

// DELETE - Delete a class
router.delete("/:id", validateClassId, (req, res, next) => {
  Classes.deleteClass(req.params.id).then((deletedClass) => {
    res.status(200).json({ message: "Successfully deleted class!" });
  });
});

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
