const express = require("express");
const router = express.Router();

const User = require("../models/User");

/* GET home page. */
router.get("/", function (req, res, next) {
  User.find({}, function (err, users) {
    const userMap = [];
    users.forEach(function (user) {
      userMap.push({
        _id: user._id,
        name: user.name,
      });
    });

    res.send(userMap);
  });
});

module.exports = router;
