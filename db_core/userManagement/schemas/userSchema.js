var expressSession = require('express-session');
var db = require("../../database_core");
var fs = require("fs");

var MongoStore = require('connect-mongo')(expressSession);
var sessionStore = new MongoStore({
    host: '127.0.0.1',
    port: '27017',
    db: 'users',
    url: 'mongodb://localhost:27017/demo'
});

var secret = "123443211234";

var userSchema = new db.mongoose.Schema({
    username: 'string',
    password: 'string'
});
var User = db.mongoose.model('User', userSchema);

function addUser(body,cb){

  var username = body.username;
  var password = body.password;

  var user = new User({
      username: username,
      password: password
  })

  user.save(function(err) {

      if (err) throw err;

      var imagePath = "public/images/userUploads/" + username;
      if (!fs.existsSync(imagePath)){
        fs.mkdirSync(imagePath, 0766, function(err) {
            if (err) {
                console.log(err);
            }
        });
      }

      cb();

  })

}

module.exports = User;
module.exports.addUser = addUser;
