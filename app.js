//core
var express = require('express');
var path = require('path');
var cookieSession = require('cookie-session');

//db
var db = require("./db_core/database_core");
db.connect();


//routes
var index = require('./routes/index');
var register = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');
var upload = require('./routes/upload');
var user = require('./routes/user');
var post = require('./routes/post');
var comment = require('./routes/comment');

//start
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(express.static(path.join(__dirname, 'public')));



app.use("/",index);
app.use("/login",login);
app.use("/logout",logout)
app.use("/register",register);
app.use("/upload",upload);
app.use("/user",user);
app.use("/post",post);
app.use("/comment",comment);





module.exports = app;
