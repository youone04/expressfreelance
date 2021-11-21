const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let routes = require('./api/router');
routes(app);   

app.get('*', (req, res , next) => {
        res.status(404);
        res.send('tidak ada routing');
})
    
app.listen(3000 , () => {
    console.log('Server terhubung di port 3000');
});
