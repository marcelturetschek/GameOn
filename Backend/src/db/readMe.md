# Guide zum mySQL Docker Container erstellen

1. Docker Desktop herunterladen
2. mySQL Container mit ```docker run -d --name gameon -e MYSQL_ROOT_PASSWORD=abc123 -p 3306:3306 mysql:latest``` erstellen und auf localhost:3306 forwarden
3. create Skript mit ```docker cp <Pfad zum Skript> gameon:/``` in den Container kopieren
4. Im Container mit ```mysql -u root -p``` anmelden (Passwort abc123)
5. ```source script.sql``` um das Skript auszuführen und die Testdatenbank zu erstellen


