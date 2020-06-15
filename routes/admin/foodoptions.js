const express = require('express');
const router = express.Router();
const mysql = require('../../utils/mysql');

router.post("/add", (req, res) => {
  let { title, opts, storeid } = req.body;
  let sql = "INSERT INTO foodoptions(title, opts, storeid) VALUES(?,?,?)";
  mysql.query(sql, [ title, JSON.stringify(opts), storeid ])
  .then(result => {
    res.send({
      foodoptions: { id: result.insertId, title, opts, storeid },
      msg: "添加成功"})
  })
  .catch(err => {
    console.log(err);
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"})
  })
})

router.post("/edit", (req, res) => {
  let { id, title, opts, storeid } = req.body;
  let sql = "UPDATE foodoptions SET title=?, opts=? WHERE id=? AND storeid=?";
  mysql.query(sql, [ title, JSON.stringify(opts), id, storeid ])
  .then(result => {
    res.send({
      foodoptions: { id, title, opts, storeid },
      msg: "修改成功"})
  })
  .catch(err => {
    console.log(err);
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"})
  })
})

router.get("/list", (req, res) => {
  let { storeid } = req.query;
  let sql = "SELECT * FROM foodoptions WHERE storeid=?";
  mysql.query(sql, [storeid])
  .then(result => {
    let list = result.map(item => {
      item.opts = JSON.parse(item.opts);
      return item;
    }).reverse();
    res.send({
      list, msg: "获取成功"})
  })
  .catch(err => {
    console.log(err);
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"})
  })
})

router.post("/remove", (req, res) => {
  let { id, storeid } = req.body;
  let sql = "DELETE FROM foodoptions WHERE id=? AND storeid=?";
  mysql.query(sql, [id, storeid])
  .then(result => {
    res.send({id, msg: "删除成功!"});
  })
  .catch(err => {
    console.log(err);
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"});
  })
})

module.exports = router