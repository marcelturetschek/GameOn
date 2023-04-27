const mysql = require('mysql');
const express = require('express')
const cors = require('cors')
//const session = require('express-session');
const app = express()
const port = 8080
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

// Define the middleware function that logs the request method
const logMethod = (req, res, next) => {
  console.log(`Request -> ${req.method}; URL -> ${req.url}; Host -> ${req.hostname}`);
  next();
}

// Use the middleware function for all routes
app.use(logMethod);

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

/* con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}); */


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  var benutzername = req.body.benutzername;
  var email = req.body.email;
  var passwort = req.body.passwort;
  //var sql = "INSERT INTO users (benutzername, email, passwort) VALUES ('" + benutzername + "', '" + email + "', '" + passwort + "')";
  res.send('Register')
})

app.post('/login', (req, res) => {
  var email = req.body.email;
  var passwort = req.body.passwort;
  res.send('Login')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


