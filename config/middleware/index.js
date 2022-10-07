const express = require('express');
const router = express.Router();
const auth = require('./auth');
const api = require('../../api/apiWithMiddleware')
const verifikasi = require('./verifikasi');

router.post('/api/register' , auth.resgistrasi);
router.post('/api/login' , auth.login);
router.post('/api/post/mahasiswa' , verifikasi() , api.createWithMiddleware);
router.get('/api/get/mahasiswa', verifikasi() , api.readWithMiddleware);
router.post('/api/update-password', auth.updatePassword);
router.post('/api/upload', api.uploadLocal);
router.put('/api/update' , api.updateData);
router.post('/api/cloud' , api.cloud);
module.exports = router;