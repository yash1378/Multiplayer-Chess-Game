let j=0;


function paint(){
    if(j%20>10){
        var w = document.getElementsByClassName('white');
        for (var i = 0; i < w.length; i++) {
            var currentDiv = w[i];
            // Manipulate each div element as needed
            currentDiv.style.backgroundColor='#bc00a3';
          }
        var b = document.getElementsByClassName('black');
        for (var i = 0; i < b.length; i++) {
            var currentDiv = b[i];
            // Manipulate each div element as needed
            currentDiv.style.backgroundColor='antiquewhite';
        }

    }
    else if(j%20<10){
        var w = document.getElementsByClassName('white');
        for (var i = 0; i < w.length; i++) {
            var currentDiv = w[i];
            // Manipulate each div element as needed
            currentDiv.style.backgroundColor='antiquewhite';
          }
        var b = document.getElementsByClassName('black');
        for (var i = 0; i < b.length; i++) {
            var currentDiv = b[i];
            // Manipulate each div element as needed
            currentDiv.style.backgroundColor='#bc00a3';
        }

    }
    j++;
    // window.requestAnimationFrame(paint);

}

window.requestAnimationFrame(paint);


// Create a 2D array to represent the chessboard
var chessboard = [
    ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR'],
    ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
    ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR']
    // Add more rows for the initial chessboard configuration
  ];
  
  // Render the chessboard
  var chessboardDiv = document.getElementsByClassName('main-frame')[0];
  for (var row = 0; row < chessboard.length; row++) {
    for (var col = 0; col < chessboard[row].length; col++) {
      var square = document.createElement('div');
      square.classList.add('square');
      square.dataset.row = row;
      square.dataset.col = col;
      square.innerText = chessboard[row][col];
      chessboardDiv.appendChild(square);
    }
  }
  
  // Add event listener to each square
  var squares = document.getElementsByClassName('square');
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', movepiece);
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

    // if the same square is selected to move and selected as position to where it has to move
     if(a===c && b===d){
      chessboard[c][d]=chessboard[a][b];
    }
   
     //for Pawn Movement ----------------------------------------------------------------------------------------------------------------->
   
     else if(chessboard[a][b]==='WP'){
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

        
     else if(chessboard[a][b]==='BP'){
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

    else if(chessboard[a][b]==='WB'){
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


    else if(chessboard[a][b]==='BB'){
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

    else if(chessboard[a][b]==='WR'){
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

    else if(chessboard[a][b]==='BR'){
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












    // ------------------------------------------------------------------------------------------------------------------------------------->
    
    // Clear the board and render the updated chessboard
    chessboardDiv.innerHTML = '';
    for (var row = 0; row < chessboard.length; row++) {
      for (var col = 0; col < chessboard[row].length; col++) {
        var square = document.createElement('div');
        square.classList.add('square');
        square.dataset.row = row;
        square.dataset.col = col;
        square.innerText = chessboard[row][col];
        chessboardDiv.appendChild(square);
      }
    }
      
    // Add event listener to each square again
    var squares = document.getElementsByClassName('square');
    for (var i = 0; i < squares.length; i++) {
      squares[i].addEventListener('click', movepiece);
    }

    //reassigning the values to the variables
    a = 0;
    b = 0;
    c = 0;
    d = 0;
    z = -1;
   
  }
   
}

 