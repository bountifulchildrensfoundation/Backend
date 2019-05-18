// DON'T NEED THIS FILE. MOVED LOGIN AND REGISTER ENDPOINTS TO /API/USERS/LOGIN /API/USERS/REGISTER

// Packages
const authRouter = require("express").Router();
const bcrypt = require("bcryptjs");

// Data
const users = require("../users/users-model.js");

// Token
const { generateToken } = require("./authenticators.js");

// ========  For endpoints beginning with /api/auth

// Register
authRouter.post("/register", (req, res) => {
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
authRouter.post("/login", (req, res) => {
    let { username, password } = req.body;
  
    users
      .findBy({ username })
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Login success! Welcome ${user.username}!`,
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

module.exports = authRouter;
