var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({
    name: "visrut",
    age: 19,
  });
});

module.exports = router;
