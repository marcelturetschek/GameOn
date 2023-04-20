const mysql = require('mysql');
const express = require('express')
const cors = require('cors')
const session = require('express-session');
const app = express()
const port = 8080

app.use(cors())

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
// how to handle axios post request in nodejs?


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
  console.log(`Example app listening on port ${port}`)
})