const { StatusCodes } = require("http-status-codes");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// env variables
const { config } = require("dotenv");
config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/User");

router.post("/register", function (req, res, next) {
  // validate input
  const { errors, isValid } = validateRegisterInput(req.body);

  // check if valid or not
  if (!isValid) {
    // 400 : BAD_REQUEST
    return res.status(StatusCodes.BAD_REQUEST).json(errors);
  }

  // check email is already exist or not
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ email: "Email already exist" });
    } else {
      stripe.customers
        .create({
          name: req.body.name,
          email: req.body.email,
          description: req.body.about,
        })
        .then((customer) => {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            about: req.body.about,
            stripeId: customer.id,
          });

          // hash the password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => res.json(user))
                .catch((err) => console.log(err));
            });
          });
        });
    }
  });
});

router.post("/login", (req, res, next) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get("/get-info", (req, res) => {
  const usertoken = req.headers.authorization;
  const token = usertoken.split(" ");

  try {
    // here "secret" is specified in config/keys.js
    const decoded = jwt.verify(token[1], "secret");

    const userId = decoded.id;
    User.findOne({ _id: userId }).then((user) => {
      return res.json({ user });
    });
    return res.status(200);
  } catch (err) {
    res.status(403);
    res.json({ error: "You are not authorized." });
  }
});

module.exports = router;
