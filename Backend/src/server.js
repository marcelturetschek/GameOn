const mysql = require('mysql');
const express = require('express')
const cors = require('cors')
//const session = require('express-session');
const app = express()
const port = 8080
const bodyParser = require('body-parser');
const validator = require('validator');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


// Define the middleware function that logs the request method
const logMethod = (req, res, next) => {
    console.log(`Request -> ${req.method}; URL -> ${req.url}; Host -> ${req.hostname}`);
    next();
}

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
    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email address');
    }

    // Insert user into database
    const sql = "INSERT INTO Userdaten (benutzername, email, passwort) VALUES (?, ?, ?)";
    const values = [benutzername, email, passwort];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error inserting user into database');
        }
        console.log("User successfully registered");
        return res.status(200).send('User successfully registered');
    });
    res.send('Register')
})

app.post('/login', (req, res) => {
    var email = req.body.email;
    var passwort = req.body.passwort;

    // verify email and password
    const sql = "SELECT * FROM Userdaten WHERE email = ? AND passwort = ?";
    const values = [email, passwort];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Login failed');
        }
        
    });    

    res.send('Login')
})





app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})


