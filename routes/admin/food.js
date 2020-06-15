const express = require('express');
const router = express.Router();
const mysql = require('../../utils/mysql');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/images');
  },
  filename: function(req, file, cb){
    console.log(req.body);
    var suf = file.originalname.slice(file.originalname.lastIndexOf("."))
    cb(null, `${Date.now()}${parseInt(Math.random()*100000)}${suf}`);
  }
})

var upload = multer({ storage: storage }).single("cover");

router.get("/config", (req, res) => {
  let { storeid } = req.query;
  let queryType = mysql.query("SELECT * FROM foodtype WHERE storeid=?", storeid);
  let queryOpts = mysql.query("SELECT * FROM foodoptions WHERE storeid=?", storeid);
  Promise.all([queryType, queryOpts])
  .then(result => {
    let optsList = result[1].map(item => {
      item.opts = JSON.parse(item.opts);
      item.opts["length"] = item.opts.length;
      return item;
    })
    res.send({typeList: result[0], optsList, msg: "菜品配置信息获取成功！"});
  })
  .catch(err => {
    console.log(err);
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"})
  })
})

router.post("/add", (req, res) => {
  upload(req, res, (err) => {
    if(err) res.send({err: -1, msg: "图片上传失败"});
    else{
      let {fname, price, descs, typeid, opts, isSale, saleType, salePrice, isNew, isHot, storeid} = req.body;
      let data = [req.file.filename, fname, price, descs, typeid, opts, isSale, saleType, salePrice, isNew, isHot, storeid];
      let sql = "INSERT INTO food(cover, fname, price, descs, typeid, opts, isSale, saleType, salePrice, isNew, isHot, storeid) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
      mysql.query(sql, data)
      .then(result => {
        res.send({msg: "添加成功！"})
      })
      .catch(err => {
        console.log(err);
        res.send({err: -29, msg: "服务器出现错误，请联系工程师！"})
      })
    }
  })
})

router.post("/edit", (req, res) => {
  upload(req, res, (err) => {
    if(err) res.send({err: -1, msg: "图片修改失败"});
    else {
      let {id, fname, price, descs, typeid, opts, isSale, saleType, salePrice, isNew, isHot} = req.body;
      let { cover } = req.body;
      if(cover){
        let arr = cover.split("/");
        cover = arr[arr.length-1];
      } else cover = req.file.filename;
      let data = [cover, fname, price, descs, typeid, opts, isSale, saleType, salePrice, isNew, isHot, id]
      let sql = "UPDATE food SET cover=?, fname=?, price=?, descs=?, typeid=?, opts=?, isSale=?, saleType=?, salePrice=?, isNew=?, isHot=? WHERE id=?";
      mysql.query(sql, data)
      .then(result => {
        res.send({msg: "修改成功!"})
      })
      .catch(err => {
        console.log(err);
        res.send({err: -29, msg: "服务器出现错误，请联系工程师！"});
      })
    }
  })
})

router.get("/list", (req, res) => {
  let { storeid } = req.query;
  let sql = "SELECT * FROM foodlist WHERE storeid=? ORDER BY id DESC";
  mysql.query(sql, [storeid])
  .then(result => {
    let list = result.map(item => {
      item.cover = `http://localhost:3000/public/images/${item.cover}`;
      return item;
    })
    res.send({list, msg: "获取成功"});
  })
  .catch(err => {
    console.log(err);
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"})
  })
})

router.post("/remove", (req, res) => {
  let { id } = req.body;
  let sql = "DELETE FROM food WHERE id=?";
  mysql.query(sql, [id])
  .then(result => {
    res.send({msg: "删除成功!"});
  })
  .catch(err => {
    console.log(err);
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"})
  })
})

module.exports = router;