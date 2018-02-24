// This file is client side application, that is responsible to send/sync files to the server
const fs = require('fs');
const path = require('path');
const http = require('http');
const dl  = require('delivery');
const publicIp = require('public-ip');
const WebSocket = require('ws')


const url = 'ws://127.0.0.1:9001'

var onOpen = function () {
    connected = true;
    console.log('Connection is opened ' + url);
};

var onClose = function () {
    connected = false;
    console.log('Connection is closed');
};

var onMessage = function (event) {
    var data = event.data;
    console.log(data);

    // delivery = dl.listen( socket );
    // delivery.connect();
    //
    // delivery.on('delivery.connect',function(delivery) {
    //   delivery.send({
    //     name: 'test.txt',
    //     path : './test/test.txt'
    //   });
    //
    //   delivery.on('send.success',function(file) {
    //     console.log('File sent successfully!');
    //   });
    // });
};

var onError = function (event) {
    // Hide the status messages
    connected = false;
    console.log('Error: ' + event);
};

var openSocket = function () {
    socket = new WebSocket(url);
    socket.onopen = onOpen;
    socket.onclose = onClose;
    socket.onmessage = onMessage;
    socket.onerror = onError;
};

var closeSocket = function () {
    if (socket) {
        console.log('CLOSING ...');
        socket.close();
    }
    connected = false;
};

openSocket();
