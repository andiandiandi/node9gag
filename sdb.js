const exec = require('child_process').exec;
const child = exec('mongod --dbpath="C:/Users/Andi/nodejsapps/nodebeginner/db"',
    (error, stdout, stderr) => {
        
});
