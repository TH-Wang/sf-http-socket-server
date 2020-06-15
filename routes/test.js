const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
  console.log(res);
  res.setHeader("Authorization", "asdhaisdmasm;l");
  res.send("ok");
})

module.exports = router