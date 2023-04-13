var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE, UPDATE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": 2592000,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
        
    };
    res.writeHead(200, headers);
}).listen(8080)