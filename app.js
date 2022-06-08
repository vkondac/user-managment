const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const exphbs = require('express-handlebars');
const routes = require('./routes/user');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

//parsing middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/x-www-form-urlencoded/json
app.use(bodyParser.json());
//static files
app.use(express.static('public'));

//templating engine
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
  }));
  app.set('view engine', '.hbs');
  app.set('views', path.join(__dirname, 'views'));

//conection pool

const pool = mysql.createPool({
    connectionLimit : 10,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT,
    insecureAuth : true

})

//connect to DB
pool.getConnection((error, connection) => {
    if(error){
        return console.log(error);
    }
    console.log('Connected to DB!');
})

//Routes

app.use('/', routes);

app.listen(port,() => {
console.log(`Server is running on port ${port}!`);
})


module.exports = pool;