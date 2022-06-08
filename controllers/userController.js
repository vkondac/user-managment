const mysql = require('mysql2');
require('dotenv').config();


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

// get all users from db
exports.view = (req,res) => {
    
    pool.getConnection((error, connection) => {
        if(error){
            return console.log(error);
        }
        console.log(`Connected to DB! with ${connection.threadId}`);
    })
    
    pool.query('SELECT * FROM usermanagement.user WHERE status ="active" ;', (err, rows) => {
        
      
        if(err){
            console.log(err);
          
        } 
        res.render('home', {rows});
        

       
    })
    
    
}

//find user by search

exports.find = (req, res) => {

    pool.getConnection((error, connection) => {
        if(error){
            return console.log(error);
        }
        console.log(`Connected to DB! with ${connection.threadId}`);
    })
    
    let searchTerm = req.body.search;

    pool.query('SELECT * FROM usermanagement.user WHERE status = "active" AND first_name LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {
        //when done with the connection,release it
      
        if(err){
            return console.log(err);
          
        } 
        res.render('home', {rows});
       

       
    })
    


}
  

exports.form = (req,res) => {
    res.render('add-user');
}




//add new user
exports.create = (req, res) => {

    const {first_name, last_name, email, phone, comment} = req.body;

    pool.getConnection((error, connection) => {
        if(error){
            return console.log(error);
        }
        console.log(`Connected to DB! with ${connection.threadId}`);
    })
    
    pool.query('INSERT INTO usermanagement.user SET first_name= ?, last_name= ?, email= ?, phone= ?, comments= ?',[first_name,last_name,email,phone,comment],(err, rows) => {
        //when done with the connection,release it
      
        if(err){
            return console.log(err);
        } 
        console.log("User added");
       
    })
    


}

//delete a user

exports.delete = (req, res)=> {

    pool.getConnection((error, connection) => {
        if(error){
            return console.log(error);
        }
        console.log(`Connected to DB! with ${connection.threadId}`);
    })
    
    pool.query('DELETE FROM usermanagement.user WHERE id = ?',[req.params.id],(err, rows) => {
      
      
        if(err){
            console.log(err);
          
        } 
       res.redirect('/');
        

       
    })
    

    
}