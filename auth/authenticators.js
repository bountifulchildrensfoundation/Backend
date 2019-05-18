// Packages
const jwt = require("jsonwebtoken");

// Environmental Variables
const secrets = require("../config/secrets.js");

module.exports = {
  generateToken,
  restricted,
  checkTitle
};

// ============= Token
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    title: user.title
  };

  secret = secrets.jwtSecret;

  const options = {
    expiresIn: "200h"
  };

  return jwt.sign(payload, secret, options);
}

// ============= Restricted Middleware
function restricted(req, res, next) {
  const token = req.headers.authorization; // paste token on authorization header prop from register/login success

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({ error: "Bad token. Make sure token is on header." });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    return res.status(401).json({
      error: "No token provided. Token must be on authorization header."
    });
  }
}

// ============= Check Title Middleware
function checkTitle(role) {
  return function(req, res, next) {
    if (
      req.decodedToken &&
      req.decodedToken.title &&
      req.decodedToken.title.includes(role)
    ) {
      next();
    } else {
      res.status(403).json({ message: "Your title does not allow access." });
    }
  };
}
