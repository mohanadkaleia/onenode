// This file is client side application, that is responsible to send/sync files to the server
const fs = require('fs');
const path = require('path');
const http = require('http');
const dl  = require('delivery');
const publicIp = require('public-ip');
const WebSocket = require('ws');
const Peer = require('simple-peer');
const wrtc = require('wrtc');
const url = 'ws://127.0.0.1:9001';
const yargs = require('yargs');
const winston = require('winston');

var authorized = false;
var connected = false;
var peer_object = {};

// FIXME delete the following variable
var recevied_signal = false;

const argv = yargs
  .options({
    p: {
      demand: true,
      alias: 'peer_id',
      describe: 'Peer ID',
      string: true
    },
    n: {
      demand: false,
      alias: 'initiator',
      describe: 'Peer is initiator (bool)',
      default: 'false'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var initiator = ('true' === argv.n);
var peer_id = argv.peer_id;
var peer = new Peer({ initiator: initiator, wrtc: wrtc });
var signal_queue = [];


peer_object.peed_id = peer_id;
var socket = new WebSocket(url);

var onClose = function () {
    connected = false;
    winston.info((new Date()) + ' Connection is closed');
};

var onMessage = function (event) {
    var data = event.data;
    handleMessage(data);
};

var onError = function (event) {
    // Hide the status messages
    connected = false;
    authorized = false;
    winston.info((new Date()) + ' Error ' + event);
};

var closeSocket = function (socket) {
    if (socket) {
        winston.info((new Date()) + ' Connection is being closed');
        socket.close();
    }
    connected = false;
    authorized = false;
};

socket.on('open', function open() {
  connected = true;
  winston.info((new Date()) + ' Connection is opened ' + url);

  // Set all event listeners to functions
  socket.onclose = onClose;
  socket.onmessage = onMessage;
  socket.onerror = onError;

  // Send registeration messsage to the server
  var message = {peer_id: argv.peer_id, type: 'registeration'};
  socket.send(JSON.stringify(message), function ack(error) {
        // In case there is an error in sending a message
  });
});


var handleMessage = function(message) {
  try {
    // Parse message as json
    var json_message = JSON.parse(message);
    // Handle signal messages
    switch(json_message.type) {
      case 'authorized':
          authorized = json_message.authorized;
          if (authorized) {
              winston.info((new Date()) + ' peer is registered successfully');

              // Send signal data to the server
              sendSignal(argv.peer_id);
          }
          break;
      case 'pair':
          // Pair with a peer using signal data
          if (authorized & connected) {
            winston.info((new Date()) + ' Pairing with ' + json_message.source);
            peer.signal(JSON.stringify(json_message.data));
          }
          break;
      case 'ack':
          winston.info((new Date()) + ' Server received message ' + JSON.stringify(json_message));
          break;
      default:
          winston.info((new Date()) + ' device ' + socket.remoteAddress + ' sent a unsupported message: ' + json_message);
    }
  } catch (e) {
    winston.info((new Date()) + ' device ' + socket.remoteAddress + ' sent wrong message. ' + JSON.stringify(json_message));
  }
}



peer.on('signal', function (data) {
  signal_queue.push(data);
  sendSignal(peer_id);
});


var sendSignal = function(peer_id) {
  // Make sure the socket connection is established
  if (!authorized || !connected) {
    return;
  }

  // Send all stored signals in the signal queus
  while (signal_queue.length > 0) {
    var signal = signal_queue.pop();
    var message = {peer_id:peer_id, type: 'signal', data: signal};
    // Send the data to the server over socket
    socket.send(JSON.stringify(message));
  }
}

peer.on('error', function (err) {
  winston.info((new Date()) + ' Error ' + err);
})

peer.on('connect', function () {
  // wait for 'connect' event before using the data channel
  winston.info((new Date()) + ' Pairing success!');
  peer.send('hey peer2, how is it going?');
})
//
peer.on('data', function (data) {
  // got a data channel message
  winston.info((new Date()) + ' Recevied data');
  console.log('got a message from peer1: ' + data)
})
