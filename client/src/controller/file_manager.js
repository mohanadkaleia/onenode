// This file is client side application, that is responsible to send/sync files to the server
// const WebSocket = require('ws');
import io from 'socket.io-client';
const events = require('events');
const eventEmitter = new events.EventEmitter();
const url = 'ws://127.0.0.1:9001';

var files = []


// var socket = new WebSocket(url);
const socket = io.connect(url);

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

  // Set all event listeners to functions
  socket.onclose = onClose;
  socket.onmessage = onMessage;
  socket.onerror = onError;
});


var handleMessage = function(message) {
  try {
    // Parse message as json
    var json_message = JSON.parse(message);
    // Handle signal messages
    switch(json_message.type) {
      case 'content':
          // Store the file content in a list
          files = json_message['body'];
          break;
      case 'addFile':
          // Add item to the explorer

          break;
      case 'deleteFile':
          // Delete file from the explorer

          break;
      default:
          // Do something!
    }
  } catch (e) {
    console.log('Server sent wrong message. ' + JSON.stringify(json_message));
  }
}

// peer.on('signal', function (data) {
//   signal_queue.push(data);
//   sendSignal(peer_id);
// });

// var sendSignal = function(peer_id) {
//   // Make sure the socket connection is established
//   if (!authorized || !connected) {
//     return;
//   }
//   // Send all stored signals in the signal queus
//   while (signal_queue.length > 0) {
//     var signal = signal_queue.pop();
//     var message = {peer_id:peer_id, type: 'signal', data: signal};
//     // Send the data to the server over socket
//     socket.send(JSON.stringify(message));
//   }
// }

// // peer.on('error', function (err) {
// //   winston.info((new Date()) + ' Error ' + err);
// // })

// // peer.on('connect', function () {
// //   // wait for 'connect' event before using the data channel
// //   winston.info((new Date()) + ' Pairing success!');
// //   peer.send('hey peer2, how is it going?');
// // })
// // //
// // peer.on('data', function (data) {
// //   // got a data channel message
// //   winston.info((new Date()) + ' Recevied data');
// //   console.log('got a message from peer1: ' + data)
// // })
