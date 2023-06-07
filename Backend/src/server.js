const mysql = require('mysql2');
const express = require('express')
const cors = require('cors')
const session = require('express-session');
const app = express()
const port = 8080
const bodyParser = require('body-parser');
const validator = require('validator');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(session({
    secret: 'supergeheimerkeyvongameon',
    resave: false,
    saveUninitialized: false,
}))

global.domain = 'GameOn.com';

const user = {
    username: "",
    email: "",
}


var corsOptions = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE, UPDATE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": 2592000,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'GameOnTGM@gmail.com',
      pass: 'qzg0nvg-JYB*yry@mdq',
    },
  });

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
        return res.send({"success": false, "msg": "Invalid Email"});
    }

    // Insert user into database
    const sql = "INSERT INTO Userdaten VALUES (?, ?, ?, ?, 0, 0, 0, 0, 0, 0, 0)";

    // Random userID 
    var userid = Math.floor(Math.random() * (99999998)) + 2;

    // Hashing the password
    const hashedPassword = hash(password);

    const values = [email, hashedPassword,username, userid];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.send({"success": false, "msg": "Invalid Email or Password"});
        } else {
            console.log("User successfully registered");
            return res.status(200).send({"success": true, "msg": "Register successful"});
        }
    });
})

/**
 * Die Login Daten werden überprüft
 * Der User füllt das Login Formular aus
 */
app.post('/login', cors(corsOptions), async (req, res) => {
    const { email, password} = req.body;

    try {
        // Verify email and password
        const sql = "SELECT * FROM Userdaten WHERE email = ? AND passwort = ?";
        const hashedPassword = hash(password);
        const values = [email, hashedPassword];

        console.log(email, hashedPassword);
        const result = await new Promise((resolve, reject) => {
            con.query(sql, values, (err, result) => {
                if (err) {
                    console.error(err);
                    reject('Login failed');
                }
                resolve(result);
            });
        });

        if (result.length === 0) {
            return res.send({"success": false, "msg": "Invalid Email or Password"});
        }

        con.query('SELECT Username FROM Userdaten WHERE email = ?', email, (err, result) => {
            if (err) {
                console.error(err);
                return res.send({"success": false, "msg": "Invalid Email or Password"});
            }

            const username = result;

            req.session.user = {
                email: email,
                username: username,
            };
        });
        console.log(JSON.stringify(email));
        console.log(JSON.stringify(req.body));
        res.send({ "success": true, "msg": "Login successful" });
    } catch (error) {
        console.error(error);
        res.send({"success": false, "msg":"Invalid Email or Password"});
    }
});

/**
 * TicTacToe Spieledaten werden gespeichert
 */
app.post('/tictactoe', (req, res) => {
    // gameData --> Wins am Stück
    const { email, gameData } = req.body;
    const sql = 'UPDATE Userdata SET ttt = ? WHERE email = ? AND ttt < ?';

    const values = [gameData, email, gameData];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Save failed');
        }
        
    });
    res.send({"success": true, "msg": "Save successful"})

});

/**
 * Minesweeper Spieledaten werden gespeichert
 */
app.post('/minesweeper', (req, res) => {
    // gameData --> Zeit für das Spiel
    const { email, gameData } = req.body;
    const sql = 'UPDATE Userdata SET ms = ? WHERE email = ? AND ms > ?';

    const values = [gameData, email, gameData];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Save failed');
        }
        
    });
    res.send({"success": true, "msg": "Save successful"})
});

/**
 * Retro Ping Pong Spieledaten werden gespeichert
 */
app.post('/retropingpong', (req, res) => {
    // gameData --> Schläge von Board
    const { email, gameData } = req.body;
    const sql = 'UPDATE Userdata SET pp = ? WHERE email = ? AND pp < ?';

    const values = [gameData, email, gameData];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Save failed');
        }
        
    });
    res.send({"success": true, "msg": "Save successful"})
});

/**
 * TGM Bird Spieledaten werden gespeichert
 */
app.post('/tgmbird', (req, res) => {
    // gameData --> Distance
    const { email, gameData } = req.body;
    const sql = 'UPDATE Userdata SET tgm = ? WHERE email = ? AND tgm < ?';

    const values = [gameData, email, gameData];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Save failed');
        }
        
    });
    return result;
});

app.post('/highscores', cors(corsOptions), (req, res) => {
        // gameData --> Distance
        // das wird pain

        // Im body muss man auswählen, für welches game man die Scores haben will
        const game = req.body.gameTitle;
        const sql = `SELECT Username, ${game} from Userdaten ORDER BY ${game} DESC LIMIT 10`
        const values = [game, game]
        con.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed loading highscores');
            }
            console.log(result)
            res.send(result)
        });
    }
);

app.post('/reset-password', (req, res) => {
    const {email} = req.body;
    const resetToken = generateResetToken();
    /*const resetLink = `https://${global.domain}/reset-password?token=${resetToken}`
    const sql = ('INSERT INTO Userdaten(resetLink) VALUES (?) WHERE email = ?');
    const values = [resetLink, email];
    con.query(sql, values), (err, result) => {
        if(result === 0){
            console.error(err);
            return res.status(500).send('User does not exist');
        }
        const mailOptions = {
            from: 'GameOnTGM@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${resetLink}`,
        };
    }
    */
    const sql = 'UPDATE Userdaten SET passwort = ? WHERE email = ?';
    const values = [generateRandomPassword(15), email];

    con.query(sql, values, (err, result) => {
        if (err) {
        console.error('Error updating password:', err);
        } else {
        console.log('Password updated successfully.');
        }
    });
    res.send({"success": true, "msg": "An E-Mail has been sent!"})

});

// Methode um 32 zufällige Stellen zu erstellen
function generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
}

function generateRandomPassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
    let password = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    return password;
}

function hash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
