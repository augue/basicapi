const mysql = require('mysql2');
const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'user_database',
})
 
const s_users = "select * from user_table ";
const insertUser_query = "insert into user_table (username,fullname,contact,email) values(?,?,?,?)"
module.exports ={pool,s_users,insertUser_query}
