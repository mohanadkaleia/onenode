var fs = require('fs');
var path = require('path');
var http = require('http');
var dl  = require('delivery');
var socket = require('socket.io-client')('http://127.0.0.1:5001');

socket.on( 'connect', function() {
  console.log( "Sockets connected" );

  delivery = dl.listen( socket );
  delivery.connect();

  delivery.on('delivery.connect',function(delivery){
    delivery.send({
      name: 'test.txt',
      path : './test/test.txt'
    });

    delivery.on('send.success',function(file){
      console.log('File sent successfully!');
    });
  });

});
