var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

var db_storage = require("../utils/db_storage")

router.use(bodyParser());
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
router.use(db_storage.Session.expressSession)
    .post('/', function(req, res, next) {

        var username = req.body.username;
        var password = req.body.password;

        db_storage.userUtils.findOne({
            username: username,
            password: password
        }, function() {
            req.session.loggedIn = true;
            req.session.username = username;

           res.json({
                valid: true,
                username : username,
                redirect: req.session.redirectTo
            });


        }, function() {
            res.json({
                valid: false,
                message: "wrong username or password"
            });
        });


    });


module.exports = router;
