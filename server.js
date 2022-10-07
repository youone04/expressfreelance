const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(fileUpload({

    useTempFiles : true
}));

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use('/uploads' , express.static('uploads'));

let routes = require('./api/router');
routes(app);
app.use('/auth' , require('./config/middleware'));

app.get('*', (req, res , next) => {
        res.status(404);
        res.send('tidak ada routing');
})
    
app.listen(8800 , () => {
    console.log('Server terhubung di port 3000');
});
