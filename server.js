const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let routes = require('./api/router');
routes(app);

app.get('*', function(req, res, next) {
      var err = new Error();

      err.status = 404;
      res.send('data')
    //   next('data');
    });
    
    
app.listen(3000 , () => {
    console.log('Server terhubung di port 3000');
});
