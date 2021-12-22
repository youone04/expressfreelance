const connection = require('../database');
const mysql = require('mysql');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../secret');

exports.resgistrasi = (req , res) => {

    const post = {
        username : req.body.username,
        email : req.body.email,
        password: md5(req.body.password),
        role : req.body.role,
        tanggal_daftar : new Date()
    }

    let query = "SELECT email from ?? WHERE ?? = ?";
    let table = ['user' , 'email' , post.email];
    query = mysql.format(query , table);
    
    connection.query(query , (err , resulst) => {
        if(err){

            res.status(500);
            res.json({
                status: 500,
                message: "error cek1"
            })

        }else{
            if(resulst.length === 0){

                let query = 'INSERT INTO ?? SET ?';
                let table = ['user'];
                query = mysql.format(query ,table);
                connection.query(query, post , (err , rows) => {
                    if(err){
                        console.log(err)
                        res.status(500);
                        res.json({
                            status : 500,
                            message: "error cek2"
                         });

                    }else{

                        res.status(200);
                        res.json({
                            status : 200,
                            message: "Berhasil Registrasi"
                         });
                    }
                })
            }else{
                
                res.status(300);
                res.json({
                    status: 300,
                    message: "Data Duplikat"
                })
            }

        }

    })
}

exports.login = (req , res) => {

    const post =  {

        email: req.body.email,
        password: req.body.password
    };

    let query = 'SELECT * FROM ?? WHERE ?? = ? AND ?? = ? ';
    let table = ['user' , 'password' , md5(post.password) , 'email' , post.email];
    query = mysql.format(query , table);

    connection.query(query , (err , rows) => {
        if(err) throw err;
        if(rows.length === 1){

            let dataToken = {
                username : rows[0].username,
                role: rows[0].role

            }
            let token = jwt.sign(dataToken ,config.secret,{

                expiresIn : '24h'
            });
            const data = {

                id_user : rows[0].id,
                akses_token : token,
                role : rows[0].role
            }

            let query = 'INSERT INTO ?? SET ?';
            let table = ['akses_token'];
            query = mysql.format(query , table);
            connection.query(query, data , (err , rows) => {

                if(err) throw err;
                res.status(200);
                res.json({
                    success: true,
                    token: token,
                    user: data.id_user,
                    role: data.role
                })
            })

        }else{

            res.status(400);
            res.json({
                status: 400,
                message: "email atau password salah"
            })
        }
    })
    
}