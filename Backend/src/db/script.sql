--DROP DATABASE IF EXISTS Datenbank;
CREATE DATABASE Datenbank;

USE Datenbank;

--
-- Tabelle Userdaten
--

CREATE TABLE Userdaten (
    Email VARCHAR(255) NOT NULL,
    Passwort VARCHAR(255) NOT NULL,
    Username VARCHAR(255) NOT NULL,
    UserID INT AUTO_INCREMENT,
    TTT INT,
    MS INT,
    PP INT,
    Q1 INT,
    Q2 INT,
    Q3 INT,
    PRIMARY KEY (UserID)

);

--
-- Tabelle Spieldaten
--

/* CREATE TABLE Spieldaten (
    UserID INT,
    TTT INT,
    MS INT,
    PP INT,
    Q1 INT,
    Q2 INT,
    Q3 INT,
    FOREIGN KEY (Email) REFERENCES Userdaten(Email)
);
*/