'use strict';

var express = require('express')
var bodyParser = require('body-parser');
var compression = require('compression');
var cors = require('cors');

var app = express();

var env = "prod";
var port = "80";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(compression());
app.use(cors());

var routes = require('./app/routes');
routes(app);

//listening on port
app.listen(port, function() {
   console.log('api backend'+env+' on port: ' + port);
});
