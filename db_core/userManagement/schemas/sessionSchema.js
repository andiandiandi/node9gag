var expressSession = require('express-session');
var db = require("../../database_core");


var MongoStore = require('connect-mongo')(expressSession);
var sessionStore = new MongoStore({
    host: '127.0.0.1',
    port: '27017',
    db: 'sessions',
    url: 'mongodb://localhost:27017/demo'
});

var secret = "123443211234";

module.exports.sessionStore = sessionStore;
module.exports.expressSession = expressSession({
    secret: secret,
    store: sessionStore
});
