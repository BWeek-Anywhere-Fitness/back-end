const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
require("colors");

const instructorRouter = require("./routes/instructor-router.js");
// const clientRouter
// const classRouter

const server = express();
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.use("/api/instructors", instructorRouter);
// server.use('/api/clients', clientRouter);
// server.use('/api/classes', classRouter);

server.get("/", (req, res) => {
  res.json({ api: "Active Fitness API is up!  Go Team 8!" });
});

module.exports = server;
