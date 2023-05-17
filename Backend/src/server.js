const mysql = require('mysql2');
const express = require('express')
const cors = require('cors')
//const session = require('express-session');
const app = express()
const port = 8080
const bodyParser = require('body-parser');
const validator = require('validator');
const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

var corsOptions = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE, UPDATE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": 2592000,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
  }


// Define the middleware function that logs the request method
const logMethod = (req, res, next) => {
    console.log(`Request -> ${req.method}; URL -> ${req.url}; Host -> ${req.hostname}`);
    next();
}

app.use(logMethod);




var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "abc123",
    database: "Datenbank"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
}); 


app.get('/', (req, res) => {
    res.send('Hello World!')
});

/**
 * Die Registrierungsdaten werden überprüft
 * Der User füllt das User Formular aus
 */
app.post('/register', cors(corsOptions), async (req, res) => {
    const { username, email, password } = req.body;
    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email address');
    }

    // Insert user into database
    const sql = "INSERT INTO Userdaten (username, email, passwort, userid) VALUES (?, ?, ?, ?)";
    var userid = Math.floor(Math.random() * (99999998)) + 2;
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [benutzername, email, passwort, userid];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error inserting user into database');
        }
        console.log("User successfully registered");
        return res.status(200).send('User successfully registered');
    }); 

    console.log(JSON.stringify(email), JSON.stringify(password), JSON.stringify(username))
    console.log(JSON.stringify(req.body));
    res.send({"success": true, "msg": "Register successful"})
})

/**
 * Die Login Daten werden überprüft
 * Der User füllt das Login Formular aus
 */
app.post('/login', cors(corsOptions), (req, res) => {
    const { email, password } = req.body;

    // verify email and password
    const sql = "SELECT * FROM Userdaten WHERE email = ? AND passwort = ?";
    const values = [email, passwort];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Login failed');
        }
        
    });
    console.log(JSON.stringify(email), JSON.stringify(password));
    console.log(JSON.stringify(req.body));
    res.send({"success": true, "msg": "Login successful"})
});

/**
 * TicTacToe Spieledaten werden gespeichert
 */
app.post('/tictactoe', (req, res) => {
    // gameData --> Wins am Stück
    const { userID, gameID, gameData } = req.body;
    console.log(JSON.stringify(email), JSON.stringify(password));
    res.send('Login')
});

/**
 * Minesweeper Spieledaten werden gespeichert
 */
app.post('/minesweeper', (req, res) => {
    // gameData --> Zeit für das Spiel
    const { userID, gameID, gameData } = req.body;

    // verify email and password
    const sql = "SELECT * FROM Userdaten WHERE email = ? AND passwort = ?";
    const values = [email, passwort];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Login failed');
        }

    });
    console.log(JSON.stringify(email), JSON.stringify(password));
    res.send('Login')
});

/**
 * Retro Ping Pong Spieledaten werden gespeichert
 */
app.post('/retropingpong', (req, res) => {
    // gameData --> Schläge von Board
    const { userID, gameID, gameData } = req.body;

    // verify email and password
    const sql = "SELECT * FROM Userdaten WHERE email = ? AND passwort = ?";
    const values = [email, passwort];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Login failed');
        }

    });
    console.log(JSON.stringify(email), JSON.stringify(password));
    res.send('Login')
});

/**
 * TGM Bird Spieledaten werden gespeichert
 */
app.post('/tgmbird', (req, res) => {
    // gameData --> Distance
    const { userID, gameID, gameData } = req.body;

    // verify email and password
    const sql = "SELECT * FROM Userdaten WHERE email = ? AND passwort = ?";
    const values = [email, passwort];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Login failed');
        }

    });
    console.log(JSON.stringify(email), JSON.stringify(password));
    res.send('Login')
});

app.get('/highscores', (req, res) => {
        // gameData --> Distance
    }
);


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})



