var express = require('express');
var router = express.Router();
var mime = require("mime");

var db_storage = require("../utils/db_storage");

var fs = require('fs');


/* GET home page. */
router.use(db_storage.Session.expressSession).get('/:username', function(req, res, next) {


    db_storage.postUtils.findAll({
            username: req.params.username
        }, function(result) {

            if (result.length > 0)
                res.json(result);
            else
                res.json({
                    err: true,
                    message: "posts not found"
                })

        }, function(result) {

            console.log("error in /user")

        }

    );




});


module.exports = router;
