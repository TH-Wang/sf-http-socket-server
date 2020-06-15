const express = require('express');
const router = express.Router();
const mysql = require('../../utils/mysql');

router.post("/add", (req, res) => {
  let { typename, storeid } = req.body;
  console.log({ typename, storeid });
  let sql = "INSERT INTO foodtype(typename, storeid, ishide) VALUES(?,?,?)";
  mysql.query(sql, [typename, storeid, 0])
  .then(result => {
    let foodtype = {id: result.insertId, typename, storeid, ishide: 0}
    res.send({foodtype, msg: `"${typename}"类别添加成功！`});
  })
  .catch(err => {
    console.log(err);
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"});
  })
})

router.post("/edit", (req, res) => {
  let { id, typename, storeid, ishide} = req.body;
  console.log(typeof ishide);
  if(ishide == 1){
    res.send({err: -1, msg: "该类别不能修改!"});
    return;
  }
  let sql = "UPDATE foodtype SET typename=? WHERE id=? AND storeid=?";
  mysql.query(sql, [typename, id, storeid])
  .then(result => {
    res.send({foodtype: { id, typename, storeid, ishide}, msg: "修改成功!"});
  })
  .catch(err => {
    console.log(err);
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"});
  })
})

router.get("/list", (req, res) => {
  let { storeid } = req.query;
  let sql = "SELECT * FROM foodtype WHERE storeid=?";
  mysql.query(sql, [storeid])
  .then(result => {
    result.forEach((item, index) => {
      result[index].foodCount = 1;
    })
    res.send(Array.prototype.reverse.call(result));
  })
  .catch(err => {
    console.log(err);
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"});
  })
})

router.post("/remove", (req, res) => {
  let {id, storeid, ishide } = req.body;
  if(ishide == 1){
    res.send({err: -1, msg: "该类别不能修改!"});
    return;
  }
  let sql = "DELETE FROM foodtype WHERE id=? AND storeid=?";
  mysql.query(sql, [id, storeid])
  .then(result => {
    res.send({id, msg: "删除成功!"});
  })
  .catch(err => {
    console.log(err);
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"});
  })
})

module.exports = router;