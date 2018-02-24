const fs = require('fs');
const path = require('path');
const http = require('http');
const io  = require('socket.io').listen(5001);
const dl  = require('delivery');
const publicIp = require('public-ip');

// List all files inside a folder
testFolder = './test/'
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

// Send a file over the browser
http.createServer(function(request, response) {
    var filePath = path.join(__dirname, 'test/test.txt');
    var stat = fs.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
})
.listen(2000);

// Receive a file from another server
io.sockets.on('connection', function(socket) {
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

var socket = require('socket.io-client')('http://127.0.0.1:5001');

socket.on( 'connect', function() {
  console.log("Sockets connected");

  delivery = dl.listen( socket );
  delivery.connect();

  delivery.on('delivery.connect',function(delivery) {
    delivery.send({
      name: 'test.txt',
      path : './test/test.txt'
    });

    delivery.on('send.success',function(file) {
      console.log('File sent successfully!');
    });
  });
});
