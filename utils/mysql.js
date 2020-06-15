const mysql = require('mysql');
// 创建mysql连接池
const pool = mysql.createPool({
    host: "localhost",          // 主机ip
    port: "3306",               // 端口号
    user: "root",               // 用户名
    password: "123456",         // 密码
    database: "scanfood"    // 数据库名
});

function query(sql, params){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) reject(err);
            else{
                connection.query(sql, params, (sqlerr, result, fields) => {
                    if(sqlerr) reject(sqlerr);
                    else resolve(result);
                    connection.release();
                })
            }
        })
    })
}

// 导出模块
module.exports = {query};