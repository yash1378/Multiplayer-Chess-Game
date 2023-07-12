const express = require('express');
const app = express();

const mongoose = require('mongoose');


//server
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

require('./db/conn');

// const User = require("../model/userSchema");

const User = require('./model/userSchema');


let connectedPlayers = 0;
var roomno=1;
var full = 0;

io.on('connection',(socket)=>{
  connectedPlayers++;
  // if(full==0){
  //   let n1 = prompt("Enter Your Name ");
  // }

  console.log('A user connected');

  console.log('Connected players:', connectedPlayers);

  // var r = roomno.toString();
  r=roomno.toString();
  socket.join("room-"+r);
  io.sockets.in("room-"+r).emit('connectedRoom',"room-"+r);
  io.sockets.in("room-"+r).emit('mes',full);

  full++;

  if(full>=4){
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
app.use(express.json());
app.use(express.static('./public'));
app.use(express.static('./Login'));
// Set up the body parser middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
// app.use(require('./Router/auth'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/login',(req,res)=>{
  res.sendFile(__dirname+'/Login/index.html');
})
app.post('/login',async (req,res)=>{
  console.log(req.body);
  //due to this res.json the header is getting setup and further it can't set headers as they are being sent to the client 
  // res.json({message:req.body});
  if(!req.body.name || !req.body.phone){
      return res.status(422).json({error:"Plz fill the fields properly"});
  }

  const userExist  = await User.findOne({name:req.body.name})
  if(userExist){
      return res.status(422).json({error:"name already exist"});
  }

    const user1 = new User({name:req.body.name,phone:req.body.phone});

    const  user2 = await user1.save();
    if(user2){
        // res.status(201).json({message:"user data saved successfully)"});
        res.writeHead(302, {
          'Location': 'http://localhost:6025/'
        });
        res.end();
    }
    else{
        res.status(500).json({error:"Failed to saved.."})
    }




})

server.listen(port, () => {
  console.log("Listening on port " + port);
});

