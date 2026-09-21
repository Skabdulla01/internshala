const express = require("express");
const router = express.Router();
const adminuser = "admin";
const adminpass = "admin";

router.post("/adminlogin", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);  
  if (username === adminuser && password === adminpass) {
    res.send("admin is here");
  } else {
    res.status(401).send("unauthorized");
  }
});
module.exports = router;
