var express = require('express');
var router = express.Router();

var db_storage = require("../utils/db_storage")


/* GET home page. */
router.use(db_storage.Session.expressSession).get('/', function(req, res, next) {

    if (req.session.loggedIn)
        res.render("index", {
            loggedIn: true,
            username: req.session.username,
            ngapp: "index",
            ngcontroller: "index_controller"
        });
    else
        res.render("index", {
            loggedIn: false,
            username: req.session.username,
            ngapp: "index",
            ngcontroller: "index_controller"
        });

});



module.exports = router;
