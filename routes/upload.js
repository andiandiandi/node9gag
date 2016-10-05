var express = require('express');
var router = express.Router();
var fs = require('fs');
var multiparty = require('multiparty');

var db_storage = require("../utils/db_storage");





/* GET home page. */
router.use(db_storage.Session.expressSession).get('/', function(req, res, next) {
    req.session.redirectTo = "/upload"
    if (req.session.loggedIn)
        res.render("index", {
            loggedIn: true,
            username: req.session.username,
            ngapp: "index",
            ngcontroller: "upload_controller"
        });
    else {
        res.redirect("/login");
    }

});



router.use(db_storage.Session.expressSession).post('/', function(req, res) {

    if (req.session.loggedIn) {

        form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {

            db_storage.Post.addPost({
                username: req.session.username
            }, fields, files, function() {
                res.json({
                    valid: true,
                    message: "posted",
                    username: req.session.username
                });
            });

        });

    } else {
        res.redirect("/login");
    }


});

module.exports = router;
