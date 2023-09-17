const express=require('express');
const exhbs=require('express-handlebars');
const bodyParser=require('body-parser');
const mysql=require('mysql2');

require('dotenv').config();

const app=express();
const port=process.env.PORT || 5000;

// parsing middleware - phan tich phan mem trung gian
// parse application /x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false  }));

// Parser application/json
app.use(bodyParser.json());

// Static files
app.use(express.static('public'));

// template engine
app.engine(
    'hbs',
    exhbs({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');

// Connection Pool
const pool=mysql.createPool({
    connectionLimit:100,
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
// connect to Db
pool.getConnection((err, connection)=>{
    if(err) throw err;  // not connected
    console.log('Connected as ID ' + connection.threadId);

})

const routes=require('./sever/routes/user');
app.use('/',routes)





app.listen(port,()=>console.log(`Listening on port ${port}`));