const express = require('express');
const router = express.Router();
const mysql = require('../../utils/mysql');
const validcode = require('../../utils/validcode');
const jwt = require('jsonwebtoken');
const fs = require('fs');

try {
  var secret = fs.readFileSync("./utils/secret.txt", "utf8");
} catch (error) {
  console.log(error);
}

function signToken(tel){
  const payload = {
    tel: tel,
    isLogin: true,
    expire: Date().now + (1000 * 60 * 60 * 24 *7)
  }
  return jwt.sign(payload, secret)
}

router.post("/pass", (req, res) => {
  let { tel } = req.body;
  let { pass } = req.body;
  let sql = "SELECT * FROM store WHERE tel=? AND pass=?";
  mysql.query(sql, [tel, pass])
  .then(result => {
    if(result.length == 0){
      res.send({err: -1, msg: "手机号或密码错误！"});
    } else {
      let { id, sname, limits, jointime, tel, pass,  } = result[0];
      if(Date.now() > limits) res.send({err: -2, msg:"对不起，您的使用期限已到，请尽快续期"});
      else {
        res.setHeader("Authorization", signToken(tel));
        res.send({msg: "登录成功！", info: { id, sname, limits, jointime, tel, pass,  }});
      }
    }
  })
  .catch(err => {
    console.log(err);
    res.send({err: -29, msg: "服务器出现错误，请联系工程师！"});
  })
})

router.post("/code", validcode, (req, res) => {
  let { tel } = req.body;
  let code = req.headers["validcode"];
  let sid = req.sessionID;
  let sql = "SELECT * FROM login_code WHERE tel=? AND sid=? AND code=?";
  mysql.query(sql, [tel, sid, code])
  .then(result => {
    if(result.length == 0) res.send({err: -1, msg: "手机号或验证码不正确！"});
    else{
      let { id, sname, limits, jointime, tel, pass,  } = result[0];
      if(Date.now() > limits) res.send({err: -2, msg:"对不起，您的使用期限已到，请尽快续期"});
      else {
        res.setHeader("Authorization", signToken(tel));
        res.send({msg: "登录成功！", info: { id, sname, limits, jointime, tel, pass,  }});
      }
    }
  })
  .catch(err => {
    res.send({err: -29, msg: err});
  })
})

module.exports = router;