const express = require('express');
const router = express.Router();
const mysql = require('../../utils/mysql');
const validcode = require('../../utils/validcode');

/**
 * route: /admin/store/add
*/
router.post('/add', validcode, async (req, res) => {
  let params = Object.values(req.body);
  try{
    let sqlAddStore = "INSERT INTO store(id,sname,limits,jointime,tel,pass) VALUES(0,?,?,?,?,?)";
    let result = await mysql.query(sqlAddStore, params)
    let sqlAddFoodtype = "INSERT INTO foodtype(typename, storeid, ishide) VALUES(?,?,?)";
    await mysql.query(sqlAddFoodtype, ["隐藏菜品", result.insertId, 1]);
    res.send({msg: 'add ok'});
  }
  catch(err){
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"})
  }
})

router.post('/list', (req, res) => {
  let sql = "SELECT * FROM store";
  mysql.query(sql)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    res.send({err: -1, msg: err});
  })
})

module.exports = router;