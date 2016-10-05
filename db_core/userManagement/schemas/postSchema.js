var expressSession = require('express-session');
var db = require("../../database_core");

var fs = require("fs");
var fileExtension = require('file-extension');



var MongoStore = require('connect-mongo')(expressSession);
var sessionStore = new MongoStore({
    host: '127.0.0.1',
    port: '27017',
    db: 'posts',
    url: 'mongodb://localhost:27017/demo'
});


var secret = "123443211234";


var postSchema = new db.mongoose.Schema({
    title: "string",
    username: "string",
    upvotes: "number",
    comments: "number",
    imagePath: "string",
    postTime_ms : "number"
});

var Post = db.mongoose.model('Post', postSchema);

function addPost(post,fields,files,cb){

  var title = fields.title[0];
  var username = post.username;
  var upvotes = 0;
  var comments = 0;
  var imagePath = files.file[0].originalFilename;
  var postTime_ms = new Date().getTime();
  console.log(postTime_ms)

  var _post = new Post({
      title: title,
      username: post.username,
      upvotes: upvotes,
      comments: comments,
      imagePath: imagePath,
      postTime_ms : postTime_ms
  })
  _post.imagePath = "images/" + "userUploads/" + post.username + "/" + _post._id + "." + fileExtension(imagePath);



  _post.save(function(err) {

          if (err) throw err;

          var src_path = files.file[0].path;
          var dest_path = "public/" + _post.imagePath;

          fs.createReadStream(src_path).pipe(fs.createWriteStream(dest_path));
          fs.unlink(src_path,function(err){
            if(err) throw err;
          })

          cb();

  });

}



module.exports = Post;
module.exports.addPost = addPost;
