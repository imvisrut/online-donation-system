const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// return all users expect loggedin one
router.get("/", function (req, res, next) {
  // if user is not authorized return forbidden
  if (!req.headers.authorization) {
    return res.send({ message: "You are not authorized" });
  }

  const usertoken = req.headers.authorization;
  const token = usertoken.split(" ");

  try {
    const decoded = jwt.verify(token[1], "secret");
    const currentUserId = decoded.id;

    User.find({}, function (err, users) {
      const userMap = [];
      users.forEach(function (user) {
        if (user._id != currentUserId) {
          userMap.push({
            _id: user._id,
            customerId: user.stripeId,
            name: user.name,
            about: user.about,
          });
        }
      });
      res.send(userMap);
    });
  } catch (err) {
    res.status(403);
    res.json({ error: "You are not authorized." });
  }
});

module.exports = router;
