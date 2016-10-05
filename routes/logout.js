var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

var db_storage = require("../utils/db_storage")


router.use(bodyParser());


/* POST home page. */
router.use(db_storage.Session.expressSession)
    .post('/', function(req, res, next) {

        if (req.session.loggedIn) {
            req.session.destroy();
            res.json({
                valid: true
            });
        } else {
            res.json({
                valid: false,
                message: "could not log out"
            });
        }

    });


module.exports = router;
