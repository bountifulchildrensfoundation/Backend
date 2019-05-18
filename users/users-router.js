// Packages
const usersRouter = require("express").Router();
const bcrypt = require("bcryptjs");


// Data
const users = require("./users-model.js");

// Middleware?
const { generateToken, restricted } = require("../auth/authenticators.js");

// ========  For endpoints beginning with /api/users


// Register
usersRouter.post("/register", (req, res) => {
  let user = req.body;

  if (
      !user ||
      !user.firstname ||
      !user.lastname || 
      !user.country ||
      !user.title ||
      !user.email ||
      !user.username ||
      !user.password
      ) {
    res.status(400).json({
      error: "To register, you must fill out a firstname, lastname, country, title, email, username, and password."
    });
  } else {
    // hash the password
    const hash = bcrypt.hashSync(user.password, 14); // 2^n rounds = salt
    user.password = hash;

    users
      .add(user)
      .then(user => {
        // generate token when successful register
        const token = generateToken(user);
        res.status(201).json({
          message: `Welcome ${user.firstname}! Your username is ${user.username}.`,
          user,
          token
        });
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error registering this user to the database."
        });
      });
  }
});


// Login
usersRouter.post("/login", (req, res) => {
  let { username, password } = req.body;

  users
    .findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          user,
          token
        }); 
      } else {
        res.status(401).json({ error: "Incorrect password" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Uh oh! There was an error logging you in." });
    });
});

// Find All Users
usersRouter.get("/", (req, res) => {
  users
    .findAllUsers()
    .then(users => {
      res.status(200).json({ users, decodedToken: req.decodedToken });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

// Find User + Stories by ID
usersRouter.get("/:id", restricted, (req, res) => {
  const userId = req.params.id;
  users
    .findByUserId(userId)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "This user could not be found." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "This user's information could not be retrieved." });
    });
});

/*


// ============ GET STUDENTS BY COHORT ID
cohortsRouter.get("/:id/students", (req, res) => {
  const cohortId = req.params.id;
  cohortsDb
    .findStudentsById(cohortId)
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ error: "This cohort could not be found." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "This cohort's information could not be retrieved." });
    });
});



  */

module.exports = usersRouter;
