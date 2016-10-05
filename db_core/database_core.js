var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

var gfs;

mongoose.connection.once('open', function callback() {
 console.log('connected!');
 mongoose.gfs = Grid(mongoose.connection.db);
});


module.exports.mongoose = mongoose;
module.exports.connection = mongoose.connection;
module.exports.connect = function(ip,port,db_name){

  var ip = ip || "127.0.0.1";
  var port = port || "27017";
  var db_name = db_name || "demo";

  mongoose.connect("mongodb://" + ip + ":" + port + "/" + db_name);

}
