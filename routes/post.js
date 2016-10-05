var express = require('express');
var router = express.Router();

var db_storage = require("../utils/db_storage")



router.use(db_storage.Session.expressSession).get('/:postID', function(req, res, next) {


    db_storage.postUtils.findPost({
            id: req.params.postID
        }, function(result) {

            if (result.length > 0) {
                res.json(result);
            } else
                res.json({
                    err: true,
                    message: "post not found"
                })

        }, function(result) {

            console.log("error in /user")

        }

    );




});









module.exports = router;
