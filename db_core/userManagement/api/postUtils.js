var Post = require("../schemas/postSchema");

function findAll(post,cb_true,cb_false){

  Post.find({username: post.username}, function(err, result){

      if(result.length>0)
        cb_true(result);
      else
        cb_false(result);

  });

}

function findPost(post,cb_true,cb_false){

  Post.find({_id : post.id}, function(err, result){

      if(result)
        cb_true(result);
      else
        db_false(result);

  });

}

module.exports.findAll = findAll;
module.exports.findPost = findPost;
