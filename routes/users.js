var express = require('express');
var router = express.Router();
var user = require('../models/user');
var crypto = require('crypto');
const init_token = 'TKL02o';

/* GET users listing. */
//用户登录接口
router.post('/login', function (req, res, next) {
  if (!req.body.username) {
    res.json({ status: 1, message: "用户名为空" })
  }
  if (!req.body.password) {
    res.json({ status: 1, message: "密码为空" })
  }
  user.findUserLogin(req.body.username, req.body.password, function (err, userSave) {
    if (userSave.length != 0) {
      //md5查看密码
      // res.json(userSave)
      // var md5 = crypto.createHash('md5');
      // var token_before = userSave[0]._id + init_token
      // res.json(userSave[0]._id)
      // var token_after = md5.update(token_before).digest('hex')
      var token_after = getMD5Password(userSave[0]._id)
      res.json({ status: 0, data: { token: token_after, user: userSave }, message: "用户登录1成功" })
    } else {
      res.json({ status: 1, message: "用户名或者密码错误" })
    }
  })
});
//用户注册接口
router.post('/register', function (req, res, next) {
  if (!req.body.username) {
    res.json({ status: 1, message: "用户名为空" })
  }
  if (!req.body.password) {
    res.json({ status: 1, message: "密码为空" })
  }
  if (!req.body.userMail) {
    res.json({ status: 1, message: "用户邮箱为空" })
  }
  if (!req.body.userPhone) {
    res.json({ status: 1, message: "用户手机为空" })
  }
  user.findByUsername(req.body.username, function (err, userSave) {
    if (userSave.length != 0) {
      // res.json(userSave)
      res.json({ status: 1, message: "用户已注册" })
    } else {
      var registerUser = new user({
        username: req.body.username,
        password: req.body.password,
        userMail: req.body.userMail,
        userPhone: req.body.userPhone,
        userAdmin: 0,
        userPower: 0,
        userStop: 0
      })
      registerUser.save(function () {
        res.json({ status: 0, message: "注册成功" })
      })
    }
  })

});

//获取md5值
function getMD5Password(id) {
  var md5 = crypto.createHash('md5');
  var token_before = id + init_token
  // res.json(userSave[0]._id)
  return md5.update(token_before).digest('hex')
}

module.exports = router;
