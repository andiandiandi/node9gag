var Comment = require("../schemas/commentSchema");

function findAll(comment,cb_true,cb_false){

  Comment.find({_id: comment.id}, function(err, result){

      if(result.length>0)
        cb_true(result);
      else
        cb_false(result);

  });

}

module.exports.findAll = findAll;
