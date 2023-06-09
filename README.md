# GameOn

## Einführung

Wir, Marcel Turetschek (Projektleiter), Felix Aust, Hipfinger Florian und Thomas Laber, sind ein vierköpfiges Projektteam. Falls es zu unerwarteten 
Unterbrechungen im Unterricht oder im allgemeinen Schultag kommt, führt dies aktuell zu langweiligen Pausen, welche 
die Schüler in unserer Klasse demotivieren. 

Deshalb möchten wir als Team eine Website mit MiniGames entwickeln, 
welche diese Pausen unterhaltsamer gestalten soll.

## Benutzte Technologien
### Backend
- [Node.js](https://nodejs.org/en/)
  - [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)

### Frontend
- [VueJS](https://vuejs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Axios](https://axios-http.com/)

## How To

Einstweilen ist das Ausführen unserer Website nur lokal im localhost vorhergesehen. Dazu kann das Repository in eine beliebige IDE geklont werden. 

Um auf die Funktionalitäten zuzugreifen muss folgendes ausgeführt werden:

### Start des NodeJS Server

Die Datei [server.js](Backend/src/server.js) muss mittels `node server.js` gestartet werden. Hierzu muss davor NodeJS unter [Node.js](https://nodejs.org/en/) installiert werden.

### Öffnen der Website

Die Datei [index.html](Frontend/public/landingpage/index.html) muss im Browser geöffnet werden. Anschließend können die Spiele gespielt werden.

### Starten des MySQL Servers

Der MySQL Server wurde auf einem Docker Container installiert. Um diesen zu starten muss Docker Desktop heruntergeladen werden. Anschließend kann der Container mit folgenden Befehlen gestartet werden:

#### Guide zum mySQL Docker Container erstellen

1. Docker Desktop herunterladen
2. mySQL Container mit ```docker run -d --name gameon -e MYSQL_ROOT_PASSWORD=abc123 -p 3306:3306 mysql:latest``` erstellen und auf localhost:3306 forwarden
3. create Skript mit ```docker cp <Pfad zum Skript (normalerweise in /gameon/backend/db/> gameon:/``` in den Container kopieren
4. Im Container mit ```mysql -u root -p``` anmelden (Passwort abc123)
5. ```source script.sql``` um das Skript auszuführen und die Testdatenbank zu erstellen

Anschließend muss der Container gestartet werden. `docker start gameon`

### Disclaimer

Aus Zeittechnischen Gründen konnte noch nicht die Session Funktion umgesetzt werden und somit bleibt man nicht bei seinem Account angemeldet.
Es werden lediglich Anmeldedaten mit den Werten aus der Datenbank verglichen bzw. Werte in die Datenbank gespeichert.

