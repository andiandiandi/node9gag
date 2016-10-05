
var User = require("../schemas/userSchema");

function findOne(user,cb_true,cb_false){


  User.findOne({
          username: user.username,
          password: user.password
      })
      .exec(function(err, user) {

          if (err)
              throw err;
          if(user)
            cb_true();
          else cb_false();

      });
}

function userExists(user,cb_true,cb_false){


  User.findOne({
          username: user.username
      })
      .exec(function(err, user) {

          if (err)
              throw err;
          if(user)
            cb_true();
          else cb_false();

      });
}

module.exports.findOne = findOne;
module.exports.userExists = userExists;
