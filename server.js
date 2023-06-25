const express = require('express');
const app = express();

//server
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);


io.on('connection',(socket)=>{
  console.log('A user connected');


  socket.on('movePiece', (moveData) => {
    // Handle the chess piece movement logic
    // ...
    console.log(moveData);


    // Broadcast the move to all connected clients except the sender
    io.emit('pieceMoved', moveData);
  });
});




















const port = process.env.PORT || 6025;

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});

