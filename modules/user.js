
var db = require('./db.js');
var Err = require('./error.js');
var error = new Err(200, '操作成功!');
//把数据库中的集合映射成js对象
function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

//向对象的原型链添加get方法
User.prototype.get = function (name, callback) {

    db.findData('users', { name }, function (err, result) {
        // console.log(result);
        if (err) {
            return callback(err);
        }
        var user = result.length == 0 ? null : result[0];
        callback(null,user);
    });
}
//添加
User.prototype.save = function (callback) {
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    }
    var users =[user];
  db.insertData('users',users,function(err,result){
      if(err){
          return callback(err);
      }
      callback(null,result);
  });
}

module.exports = User;