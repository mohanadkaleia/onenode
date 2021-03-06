const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const api = require("./controllers/api");
const WebSocketServer = require("websocket").server;
const winston = require("winston");
const SOCKET = 9000;
const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hey Mohanad!2");
});

app.get("/file/git/", (req, res) => {
  console.log("hello");
  api.listFiles("data/", response => {
    res.send(response);
  });
});

console.log("Node Express Web server is listening on port 8081");
app.listen(process.env.PORT || 8081);

// Socket Server
var server = app.listen(SOCKET, function(request, response) {
  // winston.info((new Date()) + ' Received request for  ' + request.url);
  winston.info(new Date() + " Server is listening on port " + SOCKET);

  // response.writeHead(404);
  // response.end();
});

var wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
});

var connection = null;

wsServer.on("request", function(request) {
  winston.info(
    new Date() +
      " Connection from origin " +
      request.remoteAddress +
      " is accepted!"
  );

  connection = request.accept(null, request.origin);

  // List of files inside the target directory
  const list_of_files = api.listFiles("tmp/", response => {
    var message = { type: "content", body: response };
    connection.sendUTF(JSON.stringify(message));
  });

  // On close
  connection.on("close", function(reasonCode, description) {
    winston.info(
      new Date() + " station " + connection.remoteAddress + " disconnected."
    );
  });
});
