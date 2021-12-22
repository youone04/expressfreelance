const database = require('../../config/database');
const response = require('../response');
const fileStream = require('fs');
const Cloudinary = require('cloudinary').v2;

Cloudinary.config({
    cloud_name: 'youone',
    api_key: '393244764989584',
    api_secret: 'RN2eg3wB8Vf55eaqhia4hwuuw0Q'
})

exports.createWithMiddleware = (req , res) => {
    let nama = req.body.nama;
    let nim = req.body.nim;
    let prodi = req.body.prodi;

    database.query("INSERT INTO mahasiswa VALUES(?,?,?,?)",[null , nama , nim , prodi] , (err , rows ,fileds) => {
        if(err){
           res.send(err);
        }else{
            response.data('Data Berhasil di simpan', res)
        }
    })
}

exports.readWithMiddleware = function(req , res){
    database.query("SELECT * FROM mahasiswa" , function(err , rows , fileds){
        if(err){
            res.send(err);
        }else{
            response.data(rows , res);
        }
    })

}

exports.uploadLocal = (req , res) => {
    const fileData = req.files.photo;

    fileData.mv("uploads/"+fileData.name ,(err ,result) => {
        if(err) throw err;
        database.query(`INSERT INTO media VALUES (${null} , "${fileData.name}")`, (err , hasil) => {
            if(err) throw err;
            res.send({
                status: 200,
                message: "Data berhasil di upload",
                data: hasil
            })
        })
        
    })
}

exports.updateData = (req, res)=> {
    const fileData = req.files.photo;
    const id = req.body.id;
    database.query("SELECT * FROM media WHERE id = "+ id, (err , hasil)=> {
        if(err) throw err;
         const dataHasil = JSON.parse(JSON.stringify(hasil))
        // console.log(dataHasil[0].file)
        fileStream.unlink('uploads/' + dataHasil[0].file, err => {
           if(err) throw err;
           fileData.mv("uploads/" + fileData.name , (err) => {
               if(err) throw err;
               database.query(`UPDATE media SET file = "${fileData.name}" WHERE id = ${id}`, (err) => {
                if(err) throw err;
                res.send({
                    status: 200,
                    message: "data berhasil di update",
                })

            })
           })
        })       
    }) 

}

exports.cloud = (req, res) => {
    const fileData = req.files.photo;
    Cloudinary.uploader.upload(fileData.tempFilePath , (err , result) => {
        if(err) throw err;
        database.query(`INSERT INTO media VALUES(${null} , "${result.secure_url}")`, (err) => {
            if(err) throw err;
            res.send({
                status: 200,
                message: "data berhasil di upload"
            })
        })
        
    })
    
}