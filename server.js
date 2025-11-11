const express = require("express");
const server = require("http").createServer();

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);

server.listen(PORT, function () {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Web Socket
const WebSocketServer = require("ws").Server;

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  const clientsCount = wss.clients.size;

  console.log(`The web socket clients count is ${clientsCount}`);

  wss.broadcast(`Current visitors: ${clientsCount}`);

  if (ws.readyState === ws.OPEN) {
    ws.send("Welcome to my server babe :)");
  }

  ws.on("close", () => {
    console.log("The client has disconnected");
  });
});

wss.broadcast = function (data) {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};
