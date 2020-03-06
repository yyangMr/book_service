var express = require('express');
// 路由引入
var router = express.Router();
// 数据库引入
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mongooseTest', function (req, res, next) {
  mongoose.connect('mongodb://localhost/pets',{userMongoClient:true});
  mongoose.Promise = global.Promise;
  var Cat = mongoose.model('Cat',{name:String});
  var tom = new Cat({name:'Tom'});
  tom.save(function (err){
    if(err){
      console.log(err);
    }else{
      console.log('success insert');
    }
  });
  res.render('数据库测试');
});

module.exports = router;
