var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2');
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//parsing frontend
var app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "guesttest",
  password: "guesttest",
  database: "mydb"
});

app.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    
    //simple mysql query
    db.query(
       "INSERT INTO users (userName, userPassword) VALUES (?,?)",
        [username, password],
     (err, result) => {
           console.log(result);
      }
 );
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

  
    //simple mysql query funkar ej utan return, 
    db.query(
       "SELECT * FROM users WHERE userName = ? AND userPassword = ?",
        [username, password],
     (err, result) => {
         if (err) {
         
         }

          if (result.length > 0) {
  
            res.send({ message: `Hej ${username} :)`});
             } else {
                 res.send({ message: "wrong username/password combination!"});
             }
      }
 );
});

app.listen(3001, () => {
    console.log("running server!");
  });




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
