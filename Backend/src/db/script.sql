--DROP DATABASE IF EXISTS Datenbank;
CREATE DATABASE Datenbank;

USE Datenbank;

--
-- Tabelle Userdaten
--

CREATE TABLE Userdaten (
    Email VARCHAR(255) NOT NULL,
    Passwort
);

--
-- Tabelle Futter
--

CREATE TABLE Futter (
    Futtersorte VARCHAR(255) NOT NULL,
    Preis FLOAT(4, 2),
    PRIMARY KEY (Futtersorte),
    Anschrift VARCHAR(255)
);

--
-- Tabelle Futterhersteller
--

CREATE TABLE Futterhersteller (
    Anschrift VARCHAR(255) NOT NULL,
    Name VARCHAR(255),
    PRIMARY KEY (Anschrift)
);
