var express = require('express');
var router = express.Router();

/* GET home page. */
//方式1(建议使用)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports =router;


//方式2
// module.exports = function(app){
//   app.get("/",function(req,res,next){
//     res.render('index',{title:'express'});
//   })
// }
