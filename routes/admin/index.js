const express = require('express');
const router = express.Router();

const storeRouter = require('./store');
const foodRouter = require('./food');
const foodtypeRouter = require('./foodtype');
const foodOptionsRouter = require('./foodoptions');
const codeRouter = require('./getcode');
const loginRouter = require('./login');

const vertoken = require('../../utils/vertoken');

router.use('/store', vertoken, storeRouter);
router.use('/food', foodRouter);
router.use('/foodtype', vertoken, foodtypeRouter);
router.use('/foodoptions', vertoken, foodOptionsRouter);
router.use('/getcode', codeRouter);
router.use('/login', loginRouter);

router.post('/test',vertoken, (req, res) => {
  res.send({err: 0, msg: "http request ok", data: [1, 2, 3, 4]});
})

module.exports = router;
