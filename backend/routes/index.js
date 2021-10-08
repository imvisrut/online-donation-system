const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* GET home page. */
router.get("/", function (req, res, next) {
  // Get singal user
  const usertoken = req.headers.authorization;
  const token = usertoken.split(" ");
  console.log(usertoken);

  // here "secret" is specified in config/keys.js
  const decoded = jwt.verify(token[1], "secret");

  const currentUserId = decoded.id;
  console.log(currentUserId);

  User.find({}, function (err, users) {
    const userMap = [];
    users.forEach(function (user) {
      if (user._id != currentUserId) {
        userMap.push({
          _id: user._id,
          name: user.name,
        });
      }
    });
    res.send(userMap);
  });
});

module.exports = router;
