const exec = require('child_process').exec;
const child = exec('mongod --dbpath="C:/Users/Andi//db"',
    (error, stdout, stderr) => {
        
});
