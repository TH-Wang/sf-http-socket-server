/**
 * @apiDefine loginSuccess
 * 
 * @apiSuccess (Response Header) {json} Authorization 权限验证token
 * @apiSuccess {String} msg  登录成功
 * @apiSuccess {Object} info  商家详细信息
 * 
 * @apiSuccess (Field:"info") {Number} id  商家id
 * @apiSuccess (Field:"info") {String} sname  商家名称
 * @apiSuccess (Field:"info") {String} limits  商家使用权限到期时间
 * @apiSuccess (Field:"info") {String} jointime  商家入驻时间
 * @apiSuccess (Field:"info") {String} tel  商家绑定的手机号码
 * @apiSuccess (Field:"info") {String} pass  商家的登录密码(加密后)
 *
 * @apiSuccessExample Response-Headers
 *     {
 *       "Authorization": "eyJhbGciOiJIUCI6IkpXVCJ9.eysZSIsImTUxNjIzOTAyMn0.tQPnKC4bKWKjsU_8XkVyc_pwutLgQZ8"
 *     } 
 * @apiSuccessExample Success-Response-Data
 *     {
 *       "msg": "登录成功！"
 *       "info": {
 *         "id": 12,
 *         "sname": "小鸡炖蘑菇快餐店",
 *         "limits": "1589476486688",
 *         "jointime": "1588871686688",
 *         "tel": "13122223333",
 *         "pass": "***********"
 *       }
 *     }
 */

// file: routes/admin/login.js
/**
 * 
 * @api {post} /admin/login/pass 密码登录
 * @apiName LoginByPass
 * @apiGroup Admin
 *
 * @apiParam {String} tel 商家手机号码
 * @apiParam {String} pass 商家登录密码
 * 
 * @apiUse loginSuccess
 * 
 * @apiError {Number} err:-1   登录查询相关：该手机号码和验证码，未在数据库中查询到匹配的结果
 * @apiError {Number} err:-2   登录查询相关：该商家使用期限已到
 * @apiError {Number} err:-29  服务端错误：服务端查询数据库时出错
 * @apiError {String} msg 错误描述
 * 
 * @apiErrorExample err : -1
 *     {
 *       "err": -1,
 *       "msg": "手机号或密码错误!"
 *     }
 * @apiErrorExample err : -2
 *     {
 *       "err": -2,
 *       "msg": "对不起，您的使用期限已到，请尽快续期"
 *     }
 * @apiErrorExample err : -29
 *     {
 *       "err": -29,
 *       "msg": "服务器出现错误，请联系工程师！"
 *     }
 * 
 * @apiVersion 1.1.0
 */

// file: routes/admin/login.js
/**
 * 
 * @api {post} /admin/login/code 验证码登录
 * @apiName LoginByCode
 * @apiGroup Admin
 * 
 * @apiHeader {String} validcode 验证码
 *
 * @apiParam {String} tel 商家手机号码
 * 
 * @apiUse loginSuccess
 * 
 * @apiError {Number} err:-1   登录查询相关：该手机号码和验证码，未在数据库中查询到匹配的结果
 * @apiError {Number} err:-2   登录查询相关：该商家使用期限已到
 * @apiError {Number} err:-11  验证码相关：前端没有在请求头中携带validcode字段
 * @apiError {Number} err:-12  验证码相关：数据库未查询到该验证码的结果
 * @apiError {Number} err:-13  验证码相关：通过当前sessionID查询到的验证码与前端请求头中携带的不匹配
 * @apiError {Number} err:-14  验证码相关：该验证码查询正确，但已超时过期
 * @apiError {Number} err:-29  服务端错误：服务端查询数据库时出错
 * @apiError {String} msg 错误描述
 * 
 * @apiErrorExample err : -1
 *     {
 *       "err": -1,
 *       "msg": "手机号或验证码不正确！"
 *     }
 * @apiErrorExample err : -2
 *     {
 *       "err": -2,
 *       "msg": "对不起，您的使用期限已到，请尽快续期"
 *     }
 * @apiErrorExample err : -11
 *     {
 *       "err": -11,
 *       "msg": "请填写验证码！"
 *     }
 * @apiErrorExample err : -12
 *     {
 *       "err": -12,
 *       "msg": "验证码验证失败！"
 *     }
 * @apiErrorExample err : -13
 *     {
 *       "err": -13,
 *       "msg": "验证码错误！"
 *     }
 * @apiErrorExample err : -14
 *     {
 *       "err": -14,
 *       "msg": "验证码失效，请重新获取！"
 *     }
 * @apiErrorExample err : -29
 *     {
 *       "err": -29,
 *       "msg": "服务器出现错误，请联系工程师！"
 *     }
 * 
 * @apiVersion 1.1.0
 */

// file: routes/admin/getcode.js
/**
 * 
 * @api {get} /admin/getcode?tel=12345678912 获取验证码
 * @apiName getTelCode
 * @apiGroup Admin
 *
 * @apiParam {String} tel 商家手机号码
 * 
 * @apiSuccess {String} code 手机验证码
 * 
 * @apiSuccessExample Success-Response
 *     {
 *       "code": "123456"
 *     }
 * 
 * @apiError {Number} err:-29 只有这一种错误情况，查询数据库时出错
 * @apiError {String} msg  错误信息
 * 
 * @apiErrorExample err : -29
 *     {
 *       "err": -29,
 *       "msg": "服务器出现错误，请联系工程师！"
 *     }
 * 
 * @apiVersion 1.1.0
 */
