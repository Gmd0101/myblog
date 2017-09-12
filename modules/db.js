
var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017);
var db = new mongodb.Db('myblog', server);

module.exports = db;

