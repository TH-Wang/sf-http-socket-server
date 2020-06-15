const express = require('express');
const router = express.Router();
const mysql = require('../../utils/mysql');

var placeOrder = async function(req, res){
  let { storeid, username, payprice, total, ispack, notes, foodList } = req.body;
  let ctime = Date.now();
  let orderid = `${ctime.toString().slice(-10)}${Math.random().toString().slice(-8)}`
  let sql = "INSERT INTO orderlist(storeid,username,orderid,payprice,total,ispack,notes,ctime) VALUES(?,?,?,?,?,?,?,?)"
  try {
    await mysql.query(sql, [storeid,username,orderid,payprice,total,ispack,notes,ctime])
    for (let i = 0; i < foodList.length; i++) {
      let item = foodList[i]
      let imgurl = item.imgurl.slice(item.imgurl.lastIndexOf("/")+1)
      let sqlStr = "INSERT INTO orderdetail(orderid,imgurl,foodname,count,sum) VALUES(?,?,?,?,?)"
      await mysql.query(sqlStr, [orderid, imgurl, item.name, item.count, item.sum])
    }
    res.send({msg: "下单成功"})
  } catch (error) {
    console.log(error)
    res.send({err: -1, msg: error})
  }
}

router.post("/order", placeOrder)

module.exports = router