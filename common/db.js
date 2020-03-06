var mongoose = require('mongoose');
// 这种写法已经被弃用
// var url = 'mongodb://localhost/movieServer'
// mongoose.connect(url);

mongoose.connect("mongodb://localhost/movieServer", { useNewUrlParser: true,useUnifiedTopology: true, }, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('Connection success!')
    }
});
module.exports = mongoose;