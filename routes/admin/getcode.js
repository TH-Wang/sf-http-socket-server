const express = require('express');
const router = express.Router();
const mysql = require('../../utils/mysql');

router.get("/", async (req, res) => {
  let sid = req.sessionID;
  let { tel } = req.query;
  let numCode = Math.random().toString().slice(-6);
  try {
    let querySql = "SELECT * FROM validcode WHERE sid=? AND tel=?";
    let queryResult = await mysql.query(querySql, [sid, tel]);
    let now = Date.now() + (1000 * 60 * 5);
    if(queryResult.length == 0){
      var sql = "INSERT INTO validcode(sid,tel,code,expire) VALUES(?,?,?,?)";
      var params = {sid, tel, code:numCode, expire: now}
    } else {
      var sql = "UPDATE validcode SET code=?, expire=? WHERE sid=? AND tel=?";
      var params = {code: numCode, expire: now, sid, tel}
    }
    await mysql.query(sql, Object.values(params))
    res.send({code: numCode});
  } catch (error) {
    res.send({err: -29, msg: error});
  }
})

module.exports = router