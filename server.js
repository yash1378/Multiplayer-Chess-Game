
const session = require('express-session');

//database mongo db

const mongoose = require('mongoose');
require('./db/conn');
const User = require('./model/userSchema');


//server
const express = require('express');
const app = express();
const http = require('http');

const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);


var naam = "Yash";

const port = process.env.PORT || 6025;
app.use(express.json());
app.use(express.static('./Login'));

app.use(session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: false
}));



// Set up the body parser middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));



app.get('/login',(req,res)=>{
  res.sendFile(__dirname+'/Login/index.html');
})
app.post('/login',async (req,res)=>{
  console.log(req.body);
  req.session.name = req.body.name;




  //due to this res.json the header is getting setup and further it can't set headers as they are being sent to the client 
  // res.json({message:req.body});
  if(!req.body.name || !req.body.phone){
      return res.status(422).json({error:"Plz fill the fields properly"});
  }

  // const userExist  = await User.findOne({name:req.body.name})
  // if(userExist){
  //     // return res.status(422).json({error:"name already exist"});
  //     res.writeHead(302, {
  //       'Location': 'http://localhost:6025/board'
  //     });
  //     res.end();
  // }

    const user1 = new User({name:req.body.name,phone:req.body.phone});

    const  user2 = await user1.save();
    if(user2){
        // res.status(201).json({message:"user data saved successfully)"});
        //this is to redirect it to the board page
        res.writeHead(302, {
          'Location': 'http://localhost:6025/board'
        });
        res.end();
    }
    else{
        res.status(500).json({error:"Failed to saved.."})
    }




})

//it should be present here otherwise on using localhost:6025/ this will get serve instead of login page
app.use(express.static('./public'));

app.get('/board', (req, res) => {
  console.log(req.session.name);
  naam = req.session.name;
  res.sendFile(__dirname + '/public/index.html');
});







//variables
let connectedPlayers = 0;
var roomno=1;
var full = 0;

io.on('connection',(socket)=>{
  connectedPlayers++;

  console.log('A user connected');
  console.log('Connected players:', connectedPlayers);
  // console.log("naam-> "+naam);


  r=roomno.toString();

  //room joining
  socket.join("room-"+r);
  io.sockets.in("room-"+r).emit('connectedRoom',"room-"+r);
  io.sockets.in("room-"+r).emit('conn',naam);

  io.sockets.in("room-"+r).emit('mes',full);

  // console.log("full->"+full+" room-> "+roomno);

  full++;
  if(full>=2){
    full=0;
    roomno++;
  }

  socket.on('movePiece', (moveData) => {
    console.log(moveData);
    io.to(moveData.roomno).emit('pieceMoved',moveData);

    // Broadcast the move to all connected clients except the sender
    // io.emit('pieceMoved', moveData);
  });

  //this is to accept those two names from client side
  socket.on('names',(data3)=>{
    console.log(data3);
    var y = roomno-1;
    //this is send both names to all the clients in the room
    io.sockets.in("room-"+y).emit('messg',data3);
  })

  socket.on('clock',(clock)=>{
    console.log(clock)
    var y = roomno-1;
    io.sockets.in("room-"+y).emit('meg',clock);
  })

  socket.on('movelist',(movelistitem)=>{
    var y = roomno-1;
    io.sockets.in("room-"+y).emit('listitem',movelistitem);
  })

  socket.on('match',(match)=>{
    console.log(match);
    var y = roomno-1;
    io.sockets.in("room-"+y).emit('matchstarted',match);

  })
  

  socket.on('disconnect', () => {
    connectedPlayers--;
    // full--;
    if(connectedPlayers===0){
      roomno=1;
    }
    console.log('A user disconnected');
    console.log('Connected Players:', connectedPlayers);
  });
});




server.listen(port, () => {
  console.log("Listening on port " + port);
});

