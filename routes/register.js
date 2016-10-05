var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var fs = require("fs");

var db_storage = require("../utils/db_storage")


/* GET home page. */

router.use(db_storage.Session.expressSession).get('/', function(req, res, next) {

    if (req.session.loggedIn)
        res.redirect("/");
    else {
        res.render("index", {
            loggedIn: false,
            username: req.session.username,
            ngapp: "index",
            ngcontroller: "login_controller"
        });
    }

});


/* POST home page. */

router.use(db_storage.Session.expressSession).use(bodyParser()).post('/', function(req, res, next) {


    var username = req.body.username;
    var password = req.body.password;



    db_storage.userUtils.userExists({
        username: username
    }, function() {

        res.json({
            valid: false,
            message: "username already in use"
        });

    }, function() {

        db_storage.User.addUser(req.body, function() {
            res.json({
                valid: true,
                redirect: req.session.redirectTo
            });
        });

    });





});

module.exports = router;
