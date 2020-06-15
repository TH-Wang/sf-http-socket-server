const jwt = require('jsonwebtoken');
const fs = require('fs');

var secret = null;

fs.readFile("./utils/secret.txt", 'utf8', (err, data) => {
  if(err) console.log(err);
  else secret = data;
})

function vertifyToken(req, res, next){
  let token = req.headers["authorization"];
  if(!token) res.send({err: 98, msg: "This request you don't have permission, please carry your token"})
  else {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) res.send({err: 99, msg: "illegal token!"});
      else next();
    })
  }
}

module.exports = vertifyToken