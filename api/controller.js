const response = require('./response');
const database = require('../config/database');

exports.index = (req , res) => {
    
    response.data('aplikasi sudah berjalan' , res)

}
