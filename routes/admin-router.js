const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../auth/secrets");

const Admins = require("../data/models/admin-model");

function makeToken(admin) {
  const payload = {
    role: "admin",
    id: admin.id,
  };
  const options = {
    expiresIn: "7 days",
  };
  return jwt.sign(payload, jwtSecret, options);
}

// Login only
router.post("/", (req, res, next) => {
  const { admin_email, admin_password } = req.body;
  Admins.findAdminBy({ admin_email: admin_email })
    .then(([admin]) => {
      console.log(admin);
      if (admin && bcryptjs.compareSync(admin_password, admin.admin_password)) {
        const token = makeToken(admin);
        res.status(200).json({
          message: `Successful login by ${admin_email}`,
          admin_id: admin.id,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid admin credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
