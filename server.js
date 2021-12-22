const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(fileUpload({

    useTempFiles : true
}));

app.use('/uploads' , express.static('uploads'));

let routes = require('./api/router');
routes(app);
app.use('/auth' , require('./config/middleware'));

app.get('*', (req, res , next) => {
        res.status(404);
        res.send('tidak ada routing');
})
    
app.listen(3000 , () => {
    console.log('Server terhubung di port 3000');
});
