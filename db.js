const mysql = require("mysql2"); 

const db = mysql.createConnection({
    host: "cckl_mysql_server",
    user: "cckl_admin",
    password: "cckl_root",
    database: "cckl_db",
})

module.exports = db;