const response = require('./response');
const database = require('../config/database');

exports.index = (req , res) => {

    response.data('aplikasi sudah berjalan' , res)

}

exports.create = (req , res) => {
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

exports.read = function(req , res){
    database.query("SELECT * FROM mahasiswa" , function(err , rows , fileds){
        if(err){
            res.send(err);
        }else{
            response.data(rows , res);
        }
    })

}

exports.update = (req, res) => {
    let id = req.body.id;
    let namaForm = req.body.nama;
    let nim = req.body.nim;
    let prodi = req.body.prodi;

    database.query("SELECT nama FROM mahasiswa WHERE id = ?" ,[id], (err , rows1 , filed) => {
        if(err){
            res.send(err)
        }else{
            let nama = JSON.parse(JSON.stringify(rows1))[0];
            database.query("UPDATE mahasiswa SET nama = ? , nim = ? , prodi = ? WHERE id = ?" ,[namaForm ,nim , prodi ,id],(err, rows2 , fileds)=> {
                if(err){
                    res.send(err);
                }else{
                    response.data(`Data Berhasil di Update dan nama sebelum di update ${nama.nama}`,res)
                }
            })


        }
    })

    
}

exports.delete = (req, res) => {
    let id = req.body.id;

    database.query("DELETE FROM mahasiswa WHERE id = ?" ,[id] , (err , rows, fileds) => {
        if(err){
            res.send(err);
        }else{
            response.data("Berhasil di Hapus", res)
        }
    })
}