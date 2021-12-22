const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const config = require('../secret');

const verifikasi = () => {
    return (req , res , next) => {
        let role = req.body.role;
        let tokenWithBearer = req.headers.authorization;

        if(tokenWithBearer){
            let token = tokenWithBearer.split(' ')[1];

            jwt.verify(token , config.secret , (err ,decoded) => {
                if(err){
                    return res.status(401).send({
                        auth: false,
                        message: "token tidak valid"
                    })
                }else{

                    if(role === 0){
                        req.auth = decoded;
                        next();
                    }else{

                        return res.status(401).send({
                            auth: false,
                            message: "role tidak dapat mengakses halaman ini"
                        })
                    }

                }
            });
        }else{

            return res.status(401).send({
                auth: false,
                message: "token kadaluarsa"
            })
        }
    }
}

module.exports = verifikasi;