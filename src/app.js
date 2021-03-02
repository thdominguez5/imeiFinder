const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importing routes

const imeiRoutes = require('./routes/customer');
const { urlencoded } = require('body-parser');

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev')); //rutas de clientes/servidor
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'dbtest',
    port: 3306,
    database: 'database'
}, 'single'));
app.use(express.urlencoded({extended: false}));
//routes
app.use('/', imeiRoutes);

// static files
app.use(express.static(path.join(__dirname, '/public')));


//starting the server
app.listen(app.get('port'), () => {
});