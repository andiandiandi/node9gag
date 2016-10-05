var expressSession = require('express-session');
var db = require("../../database_core");

var fs = require("fs");



var MongoStore = require('connect-mongo')(expressSession);
var sessionStore = new MongoStore({
    host: '127.0.0.1',
    port: '27017',
    db: 'comments',
    url: 'mongodb://localhost:27017/demo'
});


var secret = "123443211234";


var commentSchema = new db.mongoose.Schema({
    comments : [
        {
        username : String,
        postTime_ms : Number,
        message : String
      }
    ],
    amount : Number
});

var Comment = db.mongoose.model('Comment', commentSchema);

function addComment(comment_obj){


  console.log(comment_obj)
  var _comment = new Comment({
      comments : [
        {
                  username : comment_obj.username,
                  postTime_ms : new Date().getTime(),
                  message : comment_obj.message
      }],
      amount : 0
  })

  _comment._id = comment_obj.id;

  console.log(_comment)
  _comment.save(function(err) {

          if (err) throw err;



  });

}



module.exports = Comment;
module.exports.addComment = addComment;
