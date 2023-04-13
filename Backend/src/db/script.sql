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
    UserID INT,
    PRIMARY KEY (Email)
);

--
-- Tabelle Spieldaten
--

CREATE TABLE Spieldaten (
    UserID INT,
    TTT INT,
    MS INT,
    PP INT,
    Q1 INT,
    Q2 INT,
    Q3 INT,
    PRIMARY KEY (UserID)
);