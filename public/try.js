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
   
  

  
  
  