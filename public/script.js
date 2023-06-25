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

// Create a 2D array to represent the chessboard
var chessboard = [
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


//defining a new function 

function movepiece1(a1,b1,c1,d1) {


  // if the same square is selected to move and selected as position to where it has to move
   if(a1===c1 && b1===d1){
    chessboard[c1][d1]=chessboard[a1][b1];
  }
 
   //for Pawn Movement ----------------------------------------------------------------------------------------------------------------->
 
   else if(chessboard[a1][b1]==='♙'){
    if(c1>a1+1 || d1>b1+1 ||d1<b1-1){
      alert('invalid move');
    }
    else{
      if(chessboard[c1][d1]==='' && d1 !==b1){
        alert('invalid move');
      }
      else  {
           chessboard[c1][d1] = chessboard[a1][b1];
           chessboard[a1][b1] = '';         
      }
    }
   }

      
   else if(chessboard[a1][b1]==='♟︎'){
    // console.log(chessboard[a1][b1]);
    // console.log('yes');
    if(c1<a1-1 || d1>b1+1 ||d1<b1-1){
      alert('invalid move');
    }
    else{
      if(chessboard[c1][d1]==='' && d1 !==b1){
        alert('invalid move');
      }
      else  {
           chessboard[c1][d1] = chessboard[a1][b1];
           chessboard[a1][b1] = '';         
      }
    }
   }
  
  // ----------------------------------------------------------------------------------------------------------------------------------->

  //for bishop movement ----------------------------------------------------------------------------------------------------------------->

  else if(chessboard[a1][b1]==='♗' || chessboard[a1][b1]==='♝' ){
    if(a1-c1 === b1-d1 || a1-c1 === d1-b1 ){
      if(c1<a1 && d1<b1){
        while(a1!==c1 && b1!==d1){
          if(chessboard[a1-1][b1-1]!==''){
            chessboard[a1-1][b1-1] = chessboard[a1][b1];
            chessboard[a1][b1]='';
            a1=a1-1;
            b1=b1-1;
            break;
          }
          else{  
          chessboard[a1-1][b1-1] = chessboard[a1][b1];
          chessboard[a1][b1]='';
          a1=a1-1;
          b1=b1-1;

          }
        }
      }

      else if(c1>a1 && d1>b1){
        while(a1!==c1 && b1!==d1){
          if(chessboard[a1+1][b1+1]!==''){
            chessboard[a1+1][b1+1] = chessboard[a1][b1];
            chessboard[a1][b1]='';
            a1=a1+1;
            b1=b1+1;
            break;
          }
          else{  
          chessboard[a1+1][b1+1] = chessboard[a1][b1];
          chessboard[a1][b1]='';
          a1=a1+1;
          b1=b1+1;
          }
        }
      }

      else if(c1>a1 && d1<b1){
        while(a1!==c1 && b1!==d1){
          if(chessboard[a1+1][b1-1]!==''){
            chessboard[a1+1][b1-1] = chessboard[a1][b1];
            chessboard[a1][b1]='';
            a1=a1+1;
            b1=b1-1;
            break;
          }
          else{ 
          chessboard[a1+1][b1-1] = chessboard[a1][b1];
          chessboard[a1][b1]='';
          a1=a1+1;
          b1=b1-1;
          }
        }
      }

      else if(c1<a1 && d1>b1){
        while(a1!==c1 && b1!==d1){
          if(chessboard[a1-1][b1+1]!==''){
            chessboard[a1-1][b1+1] = chessboard[a1][b1];
            chessboard[a1][b1]='';
            a1=a1-1;
            b1=b1+1;
            break;
          }
          else{ 
          chessboard[a1-1][b1+1] = chessboard[a1][b1];
          chessboard[a1][b1]='';
          a1=a1-1;
          b1=b1+1;
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

  else if(chessboard[a1][b1]==='♖' || chessboard[a1][b1]==='♜'){
    if(a1===c || b1===d){
      if(a1===c){
        if(b>d){
          while(b1!==d1){
            if(chessboard[a1][b1-1]!==''){
              chessboard[a1][b1-1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              break;
            }
            else{
              chessboard[a1][b1-1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              b1=b1-1;               
            }
          }
        }
        else if(b<d){
          while(b1!==d1){
            if(chessboard[a1][b1+1]!==''){
              chessboard[a1][b1+1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              break;
            }
            else{
              chessboard[a1][b1+1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              b1=b1+1;               
            }
          }            
        }
      }
      else if(b1===d){
        if(a>c){
          while(a1!==c1){
            if(chessboard[a1-1][b1]!==''){
              chessboard[a1-1][b1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              break;
            }
            else{
              chessboard[a1-1][b1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              a1=a1-1;               
            }
          }
        }
        else if(a1<c1){
          while(a1!==c1){
            if(chessboard[a1+1][b1]!==''){
              chessboard[a1+1][b1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              break;
            }
            else{
              chessboard[a1+1][b1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              a1=a1+1;               
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
  else if(chessboard[a1][b1]==='♕' || chessboard[a1][b1]==='♛'){
    if(a1===c1 || b1===d1){
      if(a1===c){
        if(b1>d1){
          while(b1!==d1){
            if(chessboard[a1][b1-1]!==''){
              chessboard[a1][b1-1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              break;
            }
            else{
              chessboard[a1][b1-1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              b1=b1-1;               
            }
          }
        }
        else if(b1<d1){
          while(b1!==d1){
            if(chessboard[a1][b1+1]!==''){
              chessboard[a1][b1+1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              break;
            }
            else{
              chessboard[a1][b1+1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              b1=b1+1;               
            }
          }            
        }
      }
      else if(b1===d){
        if(a1>c1){
          while(a1!==c1){
            if(chessboard[a1-1][b1]!==''){
              chessboard[a1-1][b1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              break;
            }
            else{
              chessboard[a1-1][b1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              a1=a1-1;               
            }
          }
        }
        else if(a1<c1){
          while(a1!==c1){
            if(chessboard[a1+1][b1]!==''){
              chessboard[a1+1][b1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              break;
            }
            else{
              chessboard[a1+1][b1] = chessboard[a1][b1];
              chessboard[a1][b1]='';
              a1=a1+1;               
            }
          }            
        }         
      }
    }


    else if(a1-c1 === b1-d1|| a1-c1 === d1-b1 ){
      if(c1<a1 && d1<b1){
        while(a1!==c1 && b1!==d1){
          if(chessboard[a1-1][b1-1]!==''){
            chessboard[a1-1][b1-1] = chessboard[a1][b1];
            chessboard[a1][b1]='';
            a1=a1-1;
            b1=b1-1;
            break;
          }
          else{  
          chessboard[a1-1][b1-1] = chessboard[a1][b1];
          chessboard[a1][b1]='';
          a1=a1-1;
          b1=b1-1;

          }
        }
      }

      else if(c1>a1 && d1>b1){
        while(a1!==c1 && b1!==d1){
          if(chessboard[a1+1][b1+1]!==''){
            chessboard[a1+1][b1+1] = chessboard[a1][b1];
            chessboard[a1][b1]='';
            a1=a1+1;
            b1=b1+1;
            break;
          }
          else{  
          chessboard[a1+1][b1+1] = chessboard[a1][b1];
          chessboard[a1][b1]='';
          a1=a1+1;
          b1=b1+1;
          }
        }
      }

      else if(c1>a1 && d1<b1){
        while(a1!==c1 && b1!==d1){
          if(chessboard[a1+1][b1-1]!==''){
            chessboard[a1+1][b1-1] = chessboard[a1][b1];
            chessboard[a1][b1]='';
            a1=a1+1;
            b1=b1-1;
            break;
          }
          else{ 
          chessboard[a1+1][b1-1] = chessboard[a1][b1];
          chessboard[a1][b1]='';
          a1=a1+1;
          b1=b1-1;
          }
        }
      }

      else if(c1<a1 && d1>b1){
        while(a1!==c1 && b1!==d1){
          if(chessboard[a1-1][b1+1]!==''){
            chessboard[a1-1][b1+1] = chessboard[a1][b1];
            chessboard[a1][b1]='';
            a1=a1-1;
            b1=b1+1;
            break;
          }
          else{ 
          chessboard[a1-1][b1+1] = chessboard[a1][b1];
          chessboard[a1][b1]='';
          a1=a1-1;
          b1=b1+1;
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
  else if(chessboard[a1][b1]==='♔' || chessboard[a1][b1]==='♚'){
    if(c1>a1+1 || c1<a1-1 || d1>b1+1 || d1<b1-1){
      alert('invalid move');
    }
    else{
      chessboard[c1][d1]=chessboard[a1][b1];
      chessboard[a1][b1]='';
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

}
 

// Add event listeners for socket events
socket.on('pieceMoved', (move) => {
  console.log(move);
// Function to handle click events on chessboard blocks
var a2 = move.fromX;
var b2 = move.fromY;
var c2 = move.toX;
var d2 = move.toY;
// console.log(a2);
// console.log(b2);
// console.log(c2);
// console.log(d2);


  movepiece1(a2,b2,c2,d2);
  
});


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


    var moveData = {
      piece: chessboard[c][d],
      fromX: a,
      fromY: b,
      toX: c,
      toY: d,
    };

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

 