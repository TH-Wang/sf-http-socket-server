/**
 * 数据库中查找：
 * 1. 如果没有，--> 请先获取验证码
 * 2. 判断是否正确
 * 3. 如果正确，判断是否过期
 */
const mysql = require('./mysql');

async function interceptor(req, res, next){
  let { validcode } = req.headers;
  let { tel } = req.body;
  let sid = req.sessionID;
  if(!validcode){
    res.send({err: -11, msg: "请填写验证码！"})
  } 
  else {
    let sql = "SELECT * FROM validcode WHERE sid=? AND tel=?";
    let result = await mysql.query(sql, [sid, tel]);
    if(result.length == 0){
      res.send({err: -12, msg: "验证码验证失败！"})
    }
    else{
      let { code, expire } = result[0];
      if(validcode != code){
        res.send({err: -13, msg: "验证码错误！"});
      } else {
        if(new Date().getTime() > expire){
          res.send({err: -14, msg: "验证码失效，请重新获取！"});
        }
        else next();
      }
    }
  }
}

module.exports = interceptor