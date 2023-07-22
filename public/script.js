// let j=0;


// function paint(){
//     if(j%20>10){
//         var w = document.getElementsByClassName('white');
//         for (var i = 0; i < w.length; i++) {
//             var currentDiv = w[i];
//             // Manipulate each div element as needed
//             currentDiv.style.backgroundColor='#bc00a3';
//           }
//         var b = document.getElementsByClassName('black');
//         for (var i = 0; i < b.length; i++) {
//             var currentDiv = b[i];
//             // Manipulate each div element as needed
//             currentDiv.style.backgroundColor='antiquewhite';
//         }

//     }
//     else if(j%20<10){
//         var w = document.getElementsByClassName('white');
//         for (var i = 0; i < w.length; i++) {
//             var currentDiv = w[i];
//             // Manipulate each div element as needed
//             currentDiv.style.backgroundColor='antiquewhite';
//           }
//         var b = document.getElementsByClassName('black');
//         for (var i = 0; i < b.length; i++) {
//             var currentDiv = b[i];
//             // Manipulate each div element as needed
//             currentDiv.style.backgroundColor='#bc00a3';
//         }

//     }
//     j++;
//     // window.requestAnimationFrame(paint);

// }

// window.requestAnimationFrame(paint);

// Create a Socket.io instance and connect to the server
const socket = io();
var newton=0;
// let name1 = prompt("Enter your Name ");
let name1= "yogi";
var roomno=0;

var naam="Yogi";
var nom="Player1";

var play=0;

var t=1;

socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('connectedRoom',(data)=>{
  console.log(data);
  roomno=data;
  // roomno=data.toString();
})

socket.on('conn',(dat)=>{
  console.log(dat);
  naam=dat;
  if(t==1){
    document.getElementById("name1").innerHTML=naam;
    nom=naam;
    t++;
  }
  else if(t==2){
    var dt = {nom,naam};
    //this is to send both names to server 
    socket.emit('names',dt);
    t=1;
  }
})


//this connection is to change both names in both players screen
socket.on('messg',(tada)=>{
    document.getElementById("name1").innerHTML=`${tada.nom}`;
    document.getElementById("name2").innerHTML=`${tada.naam}`;
})

socket.on('mes',(data1)=>{
  console.log(data1);
  // play=data1;
})

socket.on('connectionRejected', (message) => {
  console.log('Connection rejected:', message);
  // alert(message);
  socket.disconnect();
  t--;
  alert(message);
  window.location.href = 'https://www.google.com/';
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
  t--;
});

socket.on('listitem',(item)=>{
  let listcontainer = document.getElementById("movelist")
  let list = listcontainer.querySelector("ul");

  if (!list) {
    list = document.createElement("ul");
    listcontainer.appendChild(list);
  }
  var newitem = document.createElement("li");
  newitem.textContent = item.piece+" "+"moved fromX -> "+item.fromX+" "+"fromY -> "+item.fromY+" "+"toX -> "+item.toX+" "+"toY -> "+item.toY;
  console.log(newitem);
  list.appendChild(newitem);
})


var chessboard=[
  ['0','0','0','0','0','0','0','0'],
  ['0','0','0','0','0','0','0','0'],
  ['0','0','0','0','0','0','0','0'],
  ['0','0','0','0','0','0','0','0'],
  ['0','0','0','0','0','0','0','0'],
  ['0','0','0','0','0','0','0','0'],
  ['0','0','0','0','0','0','0','0'],
  ['0','0','0','0','0','0','0','0']
];


// Create a 2D array to represent the chessboard

  chessboard = [
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['♟︎', '♟︎', '♟︎', '♟︎', '♟︎', '♟︎', '♟︎', '♟︎'],
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
    // Add more rows for the initial chessboard configuration
  ];



// play++;
// Render the chessboard
var chessboardDiv = document.getElementsByClassName('main-frame')[0];
for (var row = 0; row < chessboard.length; row++) {
  for (var col = 0; col < chessboard[row].length; col++) {
    var square = document.createElement('div');
    if((row+col)%2==0){
      square.classList.add('square');
    }
    else{
      square.classList.add('square1');
    }

    square.dataset.row = row;
    square.dataset.col = col;
    square.innerText = chessboard[row][col];
    chessboardDiv.appendChild(square);
  }
}



// Add event listener to each square
var squares = document.getElementsByClassName('square');
for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click',function(e){ 
    e.preventDefault(); 
    movepiece.call(this);
  });
}
var squares1 = document.getElementsByClassName('square1');
for (var i = 0; i < squares1.length; i++) {
  squares1[i].addEventListener('click',function(e){ 
    e.preventDefault(); 
    movepiece.call(this);
  });
}



//defining variables for storing the current and moved position of the piece
var a = 0;
var b = 0;
var c = 0;
var d = 0;


//variable to choose which function should get executed on clicking on the squares
var z = -1;



// Function to handle click events on chessboard blocks
function movepiece() {
    if(z<0){
        // Get the position of the selected square
        var selectedRow1 = parseInt(this.dataset.row);
        var selectedCol1 = parseInt(this.dataset.col);
    
        // parseInt is converting the string into integers so the value of row and column which we get directly is not integres as its
        //  string but after converting them using parseInt we can have their int form
        console.log(this.dataset.row,"single ",this.dataset.col);
    
        a = selectedRow1;
        b = selectedCol1;
        z = 1;
    
  }
  else if (z>0){
     // Create an object with row and column properties
     var selectedRow = parseInt(this.dataset.row);
     var selectedCol = parseInt(this.dataset.col);
   
     // parseInt is converting the string into integers so the value of row and column which we get directly is not integres as its
     //  string but after converting them using parseInt we can have their int form
     console.log(this.dataset.row,"double ",this.dataset.col);
   
   
     c = selectedRow;
     d = selectedCol;

     var moveData = {
      piece: chessboard[a][b],
      fromX: a,
      fromY: b,
      toX: c,
      toY: d,
      roomno:roomno
    };

    // if the same square is selected to move and selected as position to where it has to move
     if(a===c && b===d){
      chessboard[c][d]=chessboard[a][b];
    }
   
     //for Pawn Movement ----------------------------------------------------------------------------------------------------------------->
   
     else if(chessboard[a][b]==='♙'){
      if(c>a+1 || d>b+1 ||d<b-1){
        alert('invalid move');
      }
      else{
        if(chessboard[c][d]==='' && d !==b){
          alert('invalid move');
        }
        else  {
             chessboard[c][d] = chessboard[a][b];
             chessboard[a][b] = '';         
        }
      }
     }

        
     else if(chessboard[a][b]==='♟︎'){
      // console.log(chessboard[a][b]);
      // console.log('yes');
      if(c<a-1 || d>b+1 ||d<b-1){
        alert('invalid move');
      }
      else{
        if(chessboard[c][d]==='' && d !==b){
          alert('invalid move');
        }
        else  {
             chessboard[c][d] = chessboard[a][b];
             chessboard[a][b] = '';         
        }
      }
     }
    
    // ----------------------------------------------------------------------------------------------------------------------------------->

    //for bishop movement ----------------------------------------------------------------------------------------------------------------->

    else if(chessboard[a][b]==='♗' || chessboard[a][b]==='♝' ){
      if(a-c === b-d || a-c === d-b ){
        if(c<a && d<b){
          while(a!==c && b!==d){
            if(chessboard[a-1][b-1]!==''){
              chessboard[a-1][b-1] = chessboard[a][b];
              chessboard[a][b]='';
              a=a-1;
              b=b-1;
              break;
            }
            else{  
            chessboard[a-1][b-1] = chessboard[a][b];
            chessboard[a][b]='';
            a=a-1;
            b=b-1;

            }
          }
        }

        else if(c>a && d>b){
          while(a!==c && b!==d){
            if(chessboard[a+1][b+1]!==''){
              chessboard[a+1][b+1] = chessboard[a][b];
              chessboard[a][b]='';
              a=a+1;
              b=b+1;
              break;
            }
            else{  
            chessboard[a+1][b+1] = chessboard[a][b];
            chessboard[a][b]='';
            a=a+1;
            b=b+1;
            }
          }
        }

        else if(c>a && d<b){
          while(a!==c && b!==d){
            if(chessboard[a+1][b-1]!==''){
              chessboard[a+1][b-1] = chessboard[a][b];
              chessboard[a][b]='';
              a=a+1;
              b=b-1;
              break;
            }
            else{ 
            chessboard[a+1][b-1] = chessboard[a][b];
            chessboard[a][b]='';
            a=a+1;
            b=b-1;
            }
          }
        }

        else if(c<a && d>b){
          while(a!==c && b!==d){
            if(chessboard[a-1][b+1]!==''){
              chessboard[a-1][b+1] = chessboard[a][b];
              chessboard[a][b]='';
              a=a-1;
              b=b+1;
              break;
            }
            else{ 
            chessboard[a-1][b+1] = chessboard[a][b];
            chessboard[a][b]='';
            a=a-1;
            b=b+1;
            }
          }
        }
      }
      else{
        alert('invalid move');
      }
    }




    // ------------------------------------------------------------------------------------------------------------------------------------------------->

    // for Rook Movement --------------------------------------------------------------------------------------------------------------------------------------------->

    else if(chessboard[a][b]==='♖' || chessboard[a][b]==='♜'){
      if(a===c || b===d){
        if(a===c){
          if(b>d){
            while(b!==d){
              if(chessboard[a][b-1]!==''){
                chessboard[a][b-1] = chessboard[a][b];
                chessboard[a][b]='';
                break;
              }
              else{
                chessboard[a][b-1] = chessboard[a][b];
                chessboard[a][b]='';
                b=b-1;               
              }
            }
          }
          else if(b<d){
            while(b!==d){
              if(chessboard[a][b+1]!==''){
                chessboard[a][b+1] = chessboard[a][b];
                chessboard[a][b]='';
                break;
              }
              else{
                chessboard[a][b+1] = chessboard[a][b];
                chessboard[a][b]='';
                b=b+1;               
              }
            }            
          }
        }
        else if(b===d){
          if(a>c){
            while(a!==c){
              if(chessboard[a-1][b]!==''){
                chessboard[a-1][b] = chessboard[a][b];
                chessboard[a][b]='';
                break;
              }
              else{
                chessboard[a-1][b] = chessboard[a][b];
                chessboard[a][b]='';
                a=a-1;               
              }
            }
          }
          else if(a<c){
            while(a!==c){
              if(chessboard[a+1][b]!==''){
                chessboard[a+1][b] = chessboard[a][b];
                chessboard[a][b]='';
                break;
              }
              else{
                chessboard[a+1][b] = chessboard[a][b];
                chessboard[a][b]='';
                a=a+1;               
              }
            }            
          }         
        }
      }
      else{
        alert('invalid move');
      }

    }

// ----------------------------------------------------------------------------------------------------------------------------------------------->

// for Queen movement----------------------------------------------------------------------------------------------------------------------------->
    else if(chessboard[a][b]==='♕' || chessboard[a][b]==='♛'){
      if(a===c || b===d){
        if(a===c){
          if(b>d){
            while(b!==d){
              if(chessboard[a][b-1]!==''){
                chessboard[a][b-1] = chessboard[a][b];
                chessboard[a][b]='';
                break;
              }
              else{
                chessboard[a][b-1] = chessboard[a][b];
                chessboard[a][b]='';
                b=b-1;               
              }
            }
          }
          else if(b<d){
            while(b!==d){
              if(chessboard[a][b+1]!==''){
                chessboard[a][b+1] = chessboard[a][b];
                chessboard[a][b]='';
                break;
              }
              else{
                chessboard[a][b+1] = chessboard[a][b];
                chessboard[a][b]='';
                b=b+1;               
              }
            }            
          }
        }
        else if(b===d){
          if(a>c){
            while(a!==c){
              if(chessboard[a-1][b]!==''){
                chessboard[a-1][b] = chessboard[a][b];
                chessboard[a][b]='';
                break;
              }
              else{
                chessboard[a-1][b] = chessboard[a][b];
                chessboard[a][b]='';
                a=a-1;               
              }
            }
          }
          else if(a<c){
            while(a!==c){
              if(chessboard[a+1][b]!==''){
                chessboard[a+1][b] = chessboard[a][b];
                chessboard[a][b]='';
                break;
              }
              else{
                chessboard[a+1][b] = chessboard[a][b];
                chessboard[a][b]='';
                a=a+1;               
              }
            }            
          }         
        }
      }


      else if(a-c === b-d || a-c === d-b ){
        if(c<a && d<b){
          while(a!==c && b!==d){
            if(chessboard[a-1][b-1]!==''){
              chessboard[a-1][b-1] = chessboard[a][b];
              chessboard[a][b]='';
              a=a-1;
              b=b-1;
              break;
            }
            else{  
            chessboard[a-1][b-1] = chessboard[a][b];
            chessboard[a][b]='';
            a=a-1;
            b=b-1;

            }
          }
        }

        else if(c>a && d>b){
          while(a!==c && b!==d){
            if(chessboard[a+1][b+1]!==''){
              chessboard[a+1][b+1] = chessboard[a][b];
              chessboard[a][b]='';
              a=a+1;
              b=b+1;
              break;
            }
            else{  
            chessboard[a+1][b+1] = chessboard[a][b];
            chessboard[a][b]='';
            a=a+1;
            b=b+1;
            }
          }
        }

        else if(c>a && d<b){
          while(a!==c && b!==d){
            if(chessboard[a+1][b-1]!==''){
              chessboard[a+1][b-1] = chessboard[a][b];
              chessboard[a][b]='';
              a=a+1;
              b=b-1;
              break;
            }
            else{ 
            chessboard[a+1][b-1] = chessboard[a][b];
            chessboard[a][b]='';
            a=a+1;
            b=b-1;
            }
          }
        }

        else if(c<a && d>b){
          while(a!==c && b!==d){
            if(chessboard[a-1][b+1]!==''){
              chessboard[a-1][b+1] = chessboard[a][b];
              chessboard[a][b]='';
              a=a-1;
              b=b+1;
              break;
            }
            else{ 
            chessboard[a-1][b+1] = chessboard[a][b];
            chessboard[a][b]='';
            a=a-1;
            b=b+1;
            }
          }
        }
      }
      else{
        alert('invalid move');
      }  
    }
// ---------------------------------------------------------------------------------------------------------------------------------------------->

// for king movement----------------------------------------------------------------------------------------------------------------------------------------------->
    else if(chessboard[a][b]==='♔' || chessboard[a][b]==='♚'){
      if(c>a+1 || c<a-1 || d>b+1 || d<b-1){
        alert('invalid move');
      }
      else{
        chessboard[c][d]=chessboard[a][b];
        chessboard[a][b]='';
      }
    }

// ------------------------------------------------------------------------------------------------------------------------------------------>
// ------------------------------------------------------------------------------------------------------------------------------------->
    
    // Clear the board and render the updated chessboard
    chessboardDiv.innerHTML = '';
    for (var row = 0; row < chessboard.length; row++) {
      for (var col = 0; col < chessboard[row].length; col++) {
        var square = document.createElement('div');
        if((row+col)%2===0){
          square.classList.add('square');
        }
        else{
          square.classList.add('square1');
        }
        square.dataset.row = row;
        square.dataset.col = col;
        square.innerText = chessboard[row][col];
        chessboardDiv.appendChild(square);
      }
    }
      
    // Add event listener to each square again
    var squares = document.getElementsByClassName('square');
    for (var i = 0; i < squares.length; i++) {
      squares[i].addEventListener('click',function(e){ 
        e.preventDefault(); 
        movepiece.call(this);
      });
    }
    var squares1 = document.getElementsByClassName('square1');
    for (var i = 0; i < squares1.length; i++) {
      squares1[i].addEventListener('click',function(e){ 
        e.preventDefault(); 
        movepiece.call(this);
      });
    }




    // console.log(moveData);

    socket.emit('movePiece', moveData);
    //reassigning the values to the variables
    a = 0;
    b = 0;
    c = 0;
    d = 0;
    z = -1;
   
  }
   
}



function move(A,B,C,D) {
  if(A===C && B===D){
   chessboard[C][D]=chessboard[A][B];
 }

  //for Pawn Movement ----------------------------------------------------------------------------------------------------------------->

  else if(chessboard[A][B]==='♙'){
   if(C>A+1 || D>B+1 ||D<B-1){
     alert('invalid move');
   }
   else{
     if(chessboard[C][D]==='' && D !==B){
       alert('invalid move');
     }
     else  {
          chessboard[C][D] = chessboard[A][B];
          chessboard[A][B] = '';         
     }
   }
  }

     
  else if(chessboard[A][B]==='♟︎'){
   // console.log(chessboard[A][B]);
   // console.log('yes');
   if(C<A-1 || D>B+1 ||D<B-1){
     alert('invalid move');
   }
   else{
     if(chessboard[C][D]==='' && D!==B){
       alert('invalid move');
     }
     else  {
          chessboard[C][D] = chessboard[A][B];
          chessboard[A][B] = '';         
     }
   }
  }
 
 // ----------------------------------------------------------------------------------------------------------------------------------->

 //for bishop movement ----------------------------------------------------------------------------------------------------------------->

 else if(chessboard[A][B]==='♗' || chessboard[A][B]==='♝' ){
   if(A-C === B-D || A-C === D-B ){
     if(C<A && D<B){
       while(A!==C && B!==D){
         if(chessboard[A-1][B-1]!==''){
           chessboard[A-1][B-1] = chessboard[A][B];
           chessboard[A][B]='';
           A=A-1;
           B=B-1;
           break;
         }
         else{  
         chessboard[A-1][B-1] = chessboard[A][B];
         chessboard[A][B]='';
         A=A-1;
         B=B-1;

         }
       }
     }

     else if(C>A && D>B){
       while(A!==C && B!==D){
         if(chessboard[A+1][B+1]!==''){
           chessboard[A+1][B+1] = chessboard[A][B];
           chessboard[A][B]='';
           A=A+1;
           B=B+1;
           break;
         }
         else{  
         chessboard[A+1][B+1] = chessboard[A][B];
         chessboard[A][B]='';
         A=A+1;
         B=B+1;
         }
       }
     }

     else if(C>A && D<B){
       while(A!==C && B!==D){
         if(chessboard[A+1][B-1]!==''){
           chessboard[A+1][B-1] = chessboard[A][B];
           chessboard[A][B]='';
           A=A+1;
           B=B-1;
           break;
         }
         else{ 
         chessboard[A+1][B-1] = chessboard[A][B];
         chessboard[A][B]='';
         A=A+1;
         B=B-1;
         }
       }
     }

     else if(C<A && D>B){
       while(A!==C && B!==D){
         if(chessboard[A-1][B+1]!==''){
           chessboard[A-1][B+1] = chessboard[A][B];
           chessboard[A][B]='';
           A=A-1;
           B=B+1;
           break;
         }
         else{ 
         chessboard[A-1][B+1] = chessboard[A][B];
         chessboard[A][B]='';
         A=A-1;
         B=B+1;
         }
       }
     }
   }
   else{
     alert('invalid move');
   }
 }




 // ------------------------------------------------------------------------------------------------------------------------------------------------->

 // for Rook Movement --------------------------------------------------------------------------------------------------------------------------------------------->

 else if(chessboard[A][B]==='♖' || chessboard[A][B]==='♜'){
   if(A===C || B===D){
     if(A===C){
       if(B>D){
         while(B!==D){
           if(chessboard[A][B-1]!==''){
             chessboard[A][B-1] = chessboard[A][B];
             chessboard[A][B]='';
             break;
           }
           else{
             chessboard[A][B-1] = chessboard[A][B];
             chessboard[A][B]='';
             B=B-1;               
           }
         }
       }
       else if(B<D){
         while(B!==D){
           if(chessboard[A][B+1]!==''){
             chessboard[A][B+1] = chessboard[A][B];
             chessboard[A][B]='';
             break;
           }
           else{
             chessboard[A][B+1] = chessboard[A][B];
             chessboard[A][B]='';
             B=B+1;               
           }
         }            
       }
     }
     else if(B===D){
       if(A>C){
         while(A!==C){
           if(chessboard[A-1][B]!==''){
             chessboard[A-1][B] = chessboard[A][B];
             chessboard[A][B]='';
             break;
           }
           else{
             chessboard[A-1][B] = chessboard[A][B];
             chessboard[A][B]='';
             A=A-1;               
           }
         }
       }
       else if(A<C){
         while(A!==C){
           if(chessboard[A+1][B]!==''){
             chessboard[A+1][B] = chessboard[A][B];
             chessboard[A][B]='';
             break;
           }
           else{
             chessboard[A+1][B] = chessboard[A][B];
             chessboard[A][B]='';
             A=A+1;               
           }
         }            
       }         
     }
   }
   else{
     alert('invalid move');
   }

 }

// ----------------------------------------------------------------------------------------------------------------------------------------------->

// for Queen movement----------------------------------------------------------------------------------------------------------------------------->
 else if(chessboard[A][B]==='♕' || chessboard[A][B]==='♛'){
   if(A===C || B===D){
     if(A===C){
       if(B>D){
         while(B!==D){
           if(chessboard[A][B-1]!==''){
             chessboard[A][B-1] = chessboard[A][B];
             chessboard[A][B]='';
             break;
           }
           else{
             chessboard[A][B-1] = chessboard[A][B];
             chessboard[A][B]='';
             B=B-1;               
           }
         }
       }
       else if(B<D){
         while(B!==D){
           if(chessboard[A][B+1]!==''){
             chessboard[A][B+1] = chessboard[A][B];
             chessboard[A][B]='';
             break;
           }
           else{
             chessboard[A][B+1] = chessboard[A][B];
             chessboard[A][B]='';
             B=B+1;               
           }
         }            
       }
     }
     else if(B===D){
       if(A>C){
         while(A!==C){
           if(chessboard[A-1][B]!==''){
             chessboard[A-1][B] = chessboard[A][B];
             chessboard[A][B]='';
             break;
           }
           else{
             chessboard[A-1][B] = chessboard[A][B];
             chessboard[A][B]='';
             A=A-1;               
           }
         }
       }
       else if(A<C){
         while(A!==C){
           if(chessboard[A+1][B]!==''){
             chessboard[A+1][B] = chessboard[A][B];
             chessboard[A][B]='';
             break;
           }
           else{
             chessboard[A+1][B] = chessboard[A][B];
             chessboard[A][B]='';
             A=A+1;               
           }
         }            
       }         
     }
   }


   else if(A-C === B-D || A-C === D-B ){
     if(C<A && D<B){
       while(A!==C && B!==D){
         if(chessboard[A-1][B-1]!==''){
           chessboard[A-1][B-1] = chessboard[A][B];
           chessboard[A][B]='';
           A=A-1;
           B=B-1;
           break;
         }
         else{  
         chessboard[A-1][B-1] = chessboard[A][B];
         chessboard[A][B]='';
         A=A-1;
         B=B-1;

         }
       }
     }

     else if(C>A && D>B){
       while(A!==C && B!==D){
         if(chessboard[A+1][B+1]!==''){
           chessboard[A+1][B+1] = chessboard[A][B];
           chessboard[A][B]='';
           A=A+1;
           B=B+1;
           break;
         }
         else{  
         chessboard[A+1][B+1] = chessboard[A][B];
         chessboard[A][B]='';
         A=A+1;
         B=B+1;
         }
       }
     }

     else if(C>A && D<B){
       while(A!==C && B!==D){
         if(chessboard[A+1][B-1]!==''){
           chessboard[A+1][B-1] = chessboard[A][B];
           chessboard[A][B]='';
           A=A+1;
           B=B-1;
           break;
         }
         else{ 
         chessboard[A+1][B-1] = chessboard[A][B];
         chessboard[A][B]='';
         A=A+1;
         B=B-1;
         }
       }
     }

     else if(C<A && D>B){
       while(A!==C && B!==D){
         if(chessboard[A-1][B+1]!==''){
           chessboard[A-1][B+1] = chessboard[A][B];
           chessboard[A][B]='';
           A=A-1;
           B=B+1;
           break;
         }
         else{ 
         chessboard[A-1][B+1] = chessboard[A][B];
         chessboard[A][B]='';
         A=A-1;
         B=B+1;
         }
       }
     }
   }
   else{
     alert('invalid move');
   }  
 }
// ---------------------------------------------------------------------------------------------------------------------------------------------->

// for king movement----------------------------------------------------------------------------------------------------------------------------------------------->
 else if(chessboard[A][B]==='♔' || chessboard[A][B]==='♚'){
   if(C>A+1 || C<A-1 || D>B+1 || D<B-1){
     alert('invalid move');
   }
   else{
     chessboard[C][D]=chessboard[A][B];
     chessboard[A][B]='';
   }
 }

// ------------------------------------------------------------------------------------------------------------------------------------------>
// ------------------------------------------------------------------------------------------------------------------------------------->
 


// for (var row = 0; row < chessboard.length; row++) {
//   for (var col = 0; col < chessboard[row].length; col++) {


 // Clear the board and render the updated chessboard
 chessboardDiv.innerHTML = '';
 for (var row = 0; row < chessboard.length; row++) {
  for (var col = 0; col < chessboard[row].length; col++) {

     var square = document.createElement('div');
     if((row+col)%2===0){
       square.classList.add('square');
     }
     else{
       square.classList.add('square1');
     }
     square.dataset.row = row;
     square.dataset.col = col;
     square.innerText = chessboard[row][col];
     chessboardDiv.appendChild(square);
   }
 }
   
 // Add event listener to each square again
 var squares = document.getElementsByClassName('square');
 for (var i = 0; i < squares.length; i++) {
   squares[i].addEventListener('click',function(e){ 
     e.preventDefault(); 
     movepiece.call(this);
   });
 }
 var squares1 = document.getElementsByClassName('square1');
 for (var i = 0; i < squares1.length; i++) {
   squares1[i].addEventListener('click',function(e){ 
     e.preventDefault(); 
     movepiece.call(this);
   });
 }

 console.log("moved...")

}

var rn = 0;

var variable = 0;
// Add event listeners for socket events
socket.on('pieceMoved', (moveData) => {
  console.log(moveData);
  var{piece,fromX,fromY,toX,toY,roomno} = moveData;
  console.log(piece,fromX,fromY,toX,toY,roomno);
  socket.emit('movelist',(moveData))
  rn = moveData.roomno;
  variable++;

  move(fromX,fromY,toX,toY);
 
  // Function to handle click events on chessboard blocks
});

const white = document.getElementById('white')
const black = document.getElementById('black')

var matchtime1 = 600;
var matchtime2 = 600;
white.textContent = 600;
black.textContent = 600;






const button = document.getElementById('start');
button.addEventListener('click',()=>{
  socket.emit('clock','clicked')
});
const clock = document.getElementById('timer')

function startCounter() {
  let count = 1;
  let interval;

  interval = setInterval(() => {
    console.log(count);
    if (count <= 10) {
      clock.textContent = count;
      count++;
    } else {
      clearInterval(interval); // Stop the interval
      clock.textContent = 'Started';
      socket.emit('match', 'match start');
    }
  }, 1000 * count);
}



socket.on('meg',(dta)=>{
  // console.log(dta);
  startCounter();
})




socket.on('matchstarted',(rata)=>{
  // console.log(rata);
  if(newton===0){
    matchCounter();
  }
  newton++;

})


// var ca = 1;
var da = 1;



function matchCounter() {
    setInterval(() => {
      if(variable%2===0){
        console.log("even");
        white.textContent = matchtime1;
        matchtime1--;
      }
      else{
        console.log("odd");
        black.textContent = matchtime2;
        matchtime2--;
      }
    }, 1000);
}



