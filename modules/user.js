
var db = require('db.js');

//把数据库中的集合映射成js对象
function User(user){
    this.name =user.name;
    this.password = user.password;
    this.email = user.email;
}

//向对象的原型链添加get方法
User.prototype.get = function(name,callback){
db.open(function(err,db){
    if(err){
        // callback(err);
        // return;
        return callback(err);
    }
    db.collection('users',function(err,collection){
        if(err){
            return callback(err);
        }
        //后一个name是形参
        collection.findOne({name:name},function(err,result){
            if(err){
                return callback(err);
            }
            callback(null,result);
        });
    });

});
}