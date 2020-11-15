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
    .catch((error) => {
      console.log(err);
      next({ code: 500, message: "Crashed on getting classes." });
    });
});

// GET - A Class - WORKS
router.get("/:id", validateClassId, (req, res) => {
  Classes.findClass(req.params.id)
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on getting class by ID" });
    });
});

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
