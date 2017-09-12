//用户登录：/login、用户注册：/reg、退出：/logout

var express = require('express');
// var db = require('modules/db.js');
var router = express.Router();
var crypto = require('crypto');
var User = require('../modules/user.js');


//进入登录页
router.get('/login', function (req, res, next) {
  res.send('respond with a resource');
});

//点击按钮登录
router.post('/login', function (req, res, next) {
  res.send('respond with a resource');
});

//进入注册页
router.get('/reg', function (req, res, next) {
  var err = req.flash('err');
  res.render('reg', { title: '注册', err: err == 0 ? false : err });
});
//注册点击按钮提交
router.post('/reg', function (req, res, next) {
  var name = req.body.name;
  var password = req.body.password;
  var password_repeat = req.body['password-repeat'];
  var email = req.body.email;
  //验证客户端发送的数据是否合法
  if (!name || !password || !password_repeat || !email) {
    req.flash('err', '用户，密码，确认密码，邮箱都不能为空!');
    res.redirect('/users/reg');
    return;
  }
  //验证两次输入的密码是否相同
  if (password != password_repeat) {
    req.flash('err', '密码不一致!');
    res.redirect('/users/reg');
    return;
  }

  //密码加密
  //创建一个md5加密的哈希对象，并操作该对象下的update(明文密码)
  var md5 = crypto.createHash('md5').update(password).digest('hex');
  password = md5;
  var user = new User({ name, password, email });

  //此处的name用来从数据库中查询数据
  user.get(name, function (err, u) {
    if (err) {
      req.flash('err', err.message);
      res.redirect('/users/reg');
      return;
    }
    if (u) {
      req.flash('err', '用户已存在');
      res.redirect('/users/reg');
      return;
    }

    user.save(function (err, result) {
      if (err) {
        req.flash('err', err.message);
        res.redirect('/users/reg');
        return;
      }
      res.redirect('/users/login');
    });

  });
});

//退出接口
router.get('/logout', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
