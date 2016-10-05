var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

var db_storage = require("../utils/db_storage")



router.use(db_storage.Session.expressSession).get('/:postID', function(req, res, next) {


    db_storage.commentUtils.findAll({
            id: req.params.postID
        }, function(result) {

            if (result.length > 0)
                res.json(result[0]);
            else
                res.json({
                    err: true,
                    message: "comment not found"
                })

        },
        function(result) {

            console.log("error in /user")

        }

    );


});


router.use(db_storage.Session.expressSession).use(bodyParser()).post('/:postID', function(req, res, next) {

    if (req.session.loggedIn) {


        var username = req.body.username;
        var message = req.body.message;
        var id = req.params.postID;

        db_storage.Comment.findOneAndUpdate({
                "_id": id
            }, {
                "$push": {
                    "comments": {
                        "username": username,
                        "message": message,
                        postTime_ms: new Date().getTime()
                    }
                }
            },
            function(err, doc) {


                if (!doc)
                    db_storage.Comment.addComment({
                        username: username,
                        message: message,
                        id: id
                    });

            }
        );




    } else {
        res.redirect("/login");
    }

});









module.exports = router;
