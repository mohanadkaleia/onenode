const path = require('path');
const http = require('http');
const WebSocketServer = require('websocket').server;
const dl = require('delivery');
const publicIp = require('public-ip');
const winston = require('winston');

// Configuration
const socket = 9001;

// This variable represnets a pool of all peers where each element in this pool
// is represented by an id = peer_id, connection and signal
var peers_pool = [];
// Create log file
winston.add(winston.transports.File, { filename: 'log.txt' });

var server = http.createServer(function (request, response) {
    winston.info((new Date()) + ' Received request for  ' + request.url);
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

var handleMessage = function(message, connection, callback) {
  try {
    // Parse message as json
    var json_message = JSON.parse(message.utf8Data);
    // Handle signal messages
    switch(json_message.type) {
      case 'registeration':
          winston.info((new Date()) + ' device ' + connection.remoteAddress + ' sent a registeration message: ' + json_message.peer_id);
          // TODO: if the peer is allowed:
          if (true) {
            // Send an authorization message
            var authorized = {"type": 'authorized', "authorized":true, "status":"OK"};
            connection.sendUTF(JSON.stringify(authorized));
            // Add the peer to the pool
            addPeerToPool(json_message.peer_id, connection, null);

            // Forward all signals to the new peer
            collect_signal(json_message.peer_id, connection);
          }

          // Send acknowledgment message:
          var aknowledgment = {"type": 'ack', "status":'OK'};
          callback(aknowledgment);
          break;
      case 'signal':
          winston.info((new Date()) + ' device ' + connection.remoteAddress + ' sent a signal message.');
          // TODO: Check if the peer is authorized
          if (true) {
            // Add the peer with his connection and signal information to the pool
            addPeerToPool(json_message.peer_id, connection, json_message.data);
            // TODO: Broadcast the peer's signal to all other peers in the pool
            broadcast_signal(json_message.peer_id, json_message.data);

            // TODO: Send all signals to the peer
            // collect_signal(json_message.peer_id, connection)
          }
          var aknowledgment = {"type": 'ack', "status":'OK'};
          callback(aknowledgment)
          break;
      default:
          callback(null)
          winston.info((new Date()) + ' device ' + connection.remoteAddress + ' sent a unsupported message: ' + json_message);
    }
  } catch (e) {
    winston.info((new Date()) + ' device ' + connection.remoteAddress + ' sent wrong message. ' + JSON.stringify(json_message));
  }
}

wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        winston.info((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    winston.info((new Date()) + ' Connection from origin ' + request.remoteAddress + ' is accepted!');


    var connection = request.accept(null, request.origin);
    var isAuthorized = false;

    // On message
    connection.on('message', function (message) {
        handleMessage(message, connection, function(ack) {
          winston.info((new Date()) + ' Server sent acknowledgment message to ' + connection.remoteAddress);
          connection.sendUTF(JSON.stringify(ack));
        });
    });

    // On close
    connection.on('close', function (reasonCode, description) {
        winston.info((new Date()) + ' station ' + connection.remoteAddress + ' disconnected.');
    });
});

var broadcast_signal = function(peer_id, signal) {
    // Broadcase the signal to all peers in the pool that are different than the current peer_id
    for (var i = 0; i < peers_pool.length; i++) {
      var peer = peers_pool[i];
      if (peer.peer_id !== peer_id && peer !== undefined) {
        winston.info((new Date()) + ' Server sent signal data to ' + peer.peer_id);
        var signal_message = {type: 'pair', source: peer_id, destination: peer.peer_id, data: signal};
        var peer_connection = peer.connection;
        peer_connection.sendUTF(JSON.stringify(signal_message));
      }
    }
}

var collect_signal = function(peer_id, connection) {
  for (var i = 0; i < peers_pool.length; i++) {
    var peer = peers_pool[i];
    if (peer.peer_id !== peer_id) {
      winston.info((new Date()) + ' Server sent signal data to ' + peer_id);
      var signal_message = {type: 'pair', source: peer.peer_id, destination: peer_id, data: peer.signal};
      connection.sendUTF(JSON.stringify(signal_message));
    }
  }
}

var addPeerToPool = function(peer_id, connection, signal) {
    // If the pool does not contain the peer then add it to pool
    for (var i = 0; i < peers_pool.length; i++) {
      if (peer_id === peers_pool[i].peer_id) {
        peers_pool[i] = {peer_id:peer_id, connection: connection, signal: signal};
        return;
      }
    }

    // Else add it to pool
    peers_pool.push({peer_id:peer_id, connection: connection, signal: signal});
}



publicIp.v4().then(ip => {
	// console.log(ip);
	//=> '46.5.21.123'
});
