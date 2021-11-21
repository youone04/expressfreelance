let mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'db_belajar_express'
});

conn.connect(err => {
    if(err) throw err;
    console.log('database terhubung');
})

module.exports = conn;