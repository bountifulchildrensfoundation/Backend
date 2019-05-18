// Packages
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Routers
//const authRouter = require("../auth/auth-router.js"); // moved /login and /register to usersRouter
const usersRouter = require("../users/users-router.js");
const storiesRouter = require("../stories/stories-router.js");

// Server 
const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

// Middleware 
const { restricted } = require("../auth/authenticators");

// Endpoints
//server.use("/api/auth", authRouter); // moved /login and /register to usersRouter
server.use("/users", usersRouter);
server.use("/stories", restricted, storiesRouter);

server.get("/", (req, res) => {
    res.send("Yay! Server is Up and Running! Welcome to Build Week.");
})

module.exports = server;