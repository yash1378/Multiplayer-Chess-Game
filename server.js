const express = require('express');
const app = express();

//server
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

let connectedPlayers = 0;
var roomno=1;
var full = 0;

io.on('connection',(socket)=>{
  connectedPlayers++;

  console.log('A user connected');

  console.log('Connected players:', connectedPlayers);

  // var r = roomno.toString();
  r=roomno.toString();
  socket.join("room-"+r);
  io.sockets.in("room-"+r).emit('connectedRoom',"room-"+r);

  full++;
  if(full>=2){
    full=0;
    roomno++;
  }




  socket.on('movePiece', (moveData) => {
    // Handle the chess piece movement logic
    // ...
    console.log(moveData);

    io.to(moveData.roomno).emit('pieceMoved',moveData);
  


    // Broadcast the move to all connected clients except the sender
    // io.emit('pieceMoved', moveData);
  });

  socket.on('disconnect', () => {
    connectedPlayers--;
    if(connectedPlayers===0){
      roomno=1;
    }
    console.log('A user disconnected');
    console.log('Connected Players:', connectedPlayers);
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

