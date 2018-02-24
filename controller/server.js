const fs = require('fs');
const path = require('path');
const http = require('http');
const WebSocketServer = require('websocket').server;
const io  = require('socket.io').listen(5001);
const dl  = require('delivery');
const publicIp = require('public-ip');
const winston = require('winston');

// Configuration
const socket = 9001;

// Create log file
winston.add(winston.transports.File, { filename: 'log.txt' });

var server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(socket, function () {
    winston.info((new Date()) + ' Server is listening on port ' + socket);
});

var wsServer = new WebSocketServer({
    httpServer: server, // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        winston.info((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    winston.info((new Date()) + ' Connection from origin ' + request.origin + ' is accepted!');


    var connection = request.accept(null, request.origin);
    var isAuthorized = false;

    // On message
    connection.on('message', function (message) {
        // var json = JSON.parse(message.utf8Data);
        var delivery = dl.listen(socket);
        delivery.on('receive.success',function(file) {

          fs.writeFile(file.name, file.buffer, function(err) {
            if(err) {
              console.log('File could not be saved: ' + err);
            } else {
              console.log('File ' + file.name + " saved");
            };
          });
        });
    });

    // On close
    connection.on('close', function (reasonCode, description) {
        winston.info((new Date()) + ' station ' + connection.remoteAddress + ' disconnected.');
    });
});


publicIp.v4().then(ip => {
	// console.log(ip);
	//=> '46.5.21.123'
});
