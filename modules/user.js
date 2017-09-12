
var db = require('./db.js');
var Err = require('./error.js');
var error = new Err(200,'操作成功!');
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
        error.code = 201;
        error.message = '打开数据库失败!'
        db.close();
        return callback(error);
    }
    db.collection('users',function(err,collection){
        if(err){
            error.code = 201;
            error.message = '打开集合失败!'
            db.close();
            return callback(error);
        }
        //后一个name是形参
        collection.findOne({name:name},function(err,user){
            db.close();
            if(err){
                error.code = 201;
                error.message = '查找失败!'
                db.close();
                return callback(error);
            }
            callback(null,user); //err设为null
        });
    });

});
}
//添加
User.prototype.save = function(callback){
    var user = {
        name:this.name,
        password:this.password,
        email:this.email
    }
    db.open(function(err,db){
        if(err){
            error.code = 201;
            error.message = '数据库打开失败!';
            db.close();
            return callback(error);
        }
        db.collection('users',function(err,collection){
            if(err){
                error.code = 201;
                error.message = '数据集合打开失败!';
                db.close();
                return callback(error);
            }
            collection.insertOne(user,function(err,result){
                db.close();
                if(err){
                    error.code = 201;
                    error.message = '数据插入失败!';
                    return callback(error);
                }
                callback(null,result);
            });
        });
    });
}

module.exports = User;