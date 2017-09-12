
var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017);
var db = new mongodb.Db('myblog', server);

var Err = require('./error.js');
var error = new Err(200,'操作成功!');

//公共的方法
function operator(db,operator, collection,filter,update,docs,callback) {
    db.open(function (err, db) {
        if (err) {
            error.code = 201;
            error.message = '操作数据库出错!'
            return callback(error);
        }
        db.collection(collection, function (err, collection) {
            if (err) {
                error.code = 201;
                error.message = '操作集合出错!'
                db.close();
                return callback(error);
            }
            if(operator == 'insert') {
                collection.insertMany(docs, function (err, result) {
                    db.close();
                    if (err) {
                        error.code = 201;
                        error.message = '插入数据出错!'
                        return callback(error);
                    }
                    callback(null, result);
                });
            }
            if(operator =='find'){
                collection.find(filter).toArray(function (err, result) {
                    db.close();
                    if (err) {
                        error.code = 201;
                        error.message = '查询数据出错!'
                        return callback(error);
                    }
                    callback(null, result);
                });
            }
            if(operator == 'update'){
                collection.update(filter,update,function(err,result){
                    db.close();
                    if (err) {
                        error.code = 201;
                        error.message = '修改数据出错!'
                        return callback(error);
                    }
                    callback(null, result);
                });
            }
            if(operator =='remove'){
                collection.remove(filter,function(err,result){
                    db.close();
                    if (err) {
                        error.code = 201;
                        error.message = '删除数据出错!'
                        return callback(error);
                    }
                    callback(null, result);
                });
            }

        });
    });
}
//给数据库db扩展四个方法
db.insertData = function(collection,docs,callback){
    operator(db,'insert',collection,null,null,docs,callback);
}
db.updateData=function(collection,filter,updae,callback){
    operator(db,'update',collection,filter,update,null,callback);
}
db.findData=function(collection,filter,callback){
    operator(db,'find',collection,filter,null,null,callback);
}
db.removeData=function(collection,filter,callback){
    operator(db,'remove',collection,filter,null,null,callback);
}














module.exports = db;