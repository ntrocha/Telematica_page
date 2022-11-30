var mysql = require('mysql');
var con = mysql.createConnection({
    host:'database-telematica.cfcr2myfepyb.us-east-1.rds.amazonaws.com',
    user:'admin',
    password:'123456789',
    database:'mundialDB'
});

con.connect(
    (err)=> {
        if(!err){
            console.log("Conexión establecida");
        } else {
            console.log("Error de conexión");
        }
    }

);

module.exports = con; 
