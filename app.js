document.addEventListener('DOMContentLoaded',() => {
   const squares = document.querySelectorAll('.square');
   const Restart = document.getElementById('restart');
   const playAgain = document.getElementById('replay');
   const startForm = document.querySelector('.naming');
   const Players = document.getElementById('players');
   let Ai = '愛';
   let Sen = '戦';
   let Player1; 
   let Player2;
//Player Factory
   const Player = (playerName,symbol,played,Points)=>{
   let gameStatus = [];
   const Chart = (() =>{return symbol})();

   const Name = (()=>{ return playerName})()  
   const Score =(()=>{return Points})()

   const Played = (() => {return played})();
   const currentGameStatus = (id) => {gameStatus.push(id); gameStatus.sort();}
   const wasPlayed =(()=> { return gameStatus;})();
   return {Name,Chart,Played,currentGameStatus,wasPlayed,Score};
   }
//Formulary
   
   startForm.addEventListener('submit',(e)=>{
      e.preventDefault()
      let player1Name = document.getElementById('player-1').value.trim();
      let player2Name = document.getElementById('player-2').value.trim();
    
      Player1 = Player(player1Name,Ai,true,0);
      Player2 = Player(player2Name,Sen,false,0);

      if(Player1.Name == ""){
         Player1.Name = 'Player 1';
      
      }
      if(Player2.Name == ""){
         Player2.Name = 'Player 2';     
      }
      startForm.style.display = 'none';
      document.getElementById('board').style.visibility = 'visible';
      Players.style.display = 'grid';
    
      Players.children[0].textContent = Player1.Name;
      Players.children[1].textContent = Player2.Name;
      Players.children[2].textContent = Player1.Score;
      Players.children[3].textContent = Player2.Score;

   })
   
   //Board Squares
   squares.forEach(square =>{
   square.addEventListener('click',Check)
   });   
   playAgain.addEventListener('click',()=>{
      clearSquares();
        Player1 = Player(Player1.Name,Ai,true,Player1.Score);
        Player2 = Player(Player2.Name,Sen,false,Player2.Score);
      document.getElementById('winner').style.visibility ='hidden';
   })
   
   //Resstart button
   Restart.addEventListener('click',()=>{
        clearSquares();
        document.getElementById('winner').style.visibility ='hidden';
        Players.style.display = 'none';
        startForm.style.display = 'block';
        document.getElementById('board').style.visibility = 'hidden';
   });
  //after repla or play again, clear board
   function clearSquares(){
      squares.forEach(square =>{
         id = square.id;
         document.getElementById(id).classList.remove('taken');
         document.getElementById(id).textContent = '';
      }) 
   }
   //Board
   function Check(s){
      if(s.target.classList.length == 2 ){
         return; 
      }
      id = s.target.id;
      square = document.getElementById(id);
      square.classList.add('taken');
      if(Player1.Played){
         player = Player1.Chart;
         Player1.Played = false;
         Player1.currentGameStatus(id);
         Board=Player1.wasPlayed;
         Name = Player1.Name; 
      }else {
         player = Player2.Chart;
         Player1.Played = true;
         Player2.currentGameStatus(id);
         Board=Player2.wasPlayed;
         Name = Player2.Name;
       }
      currentPlay(player,id);
      //checks Win condition
      if(checkVictory(Board)){
         squares.forEach(square =>{
            square.classList.add('taken');
         })
    
        if(Player1.Played){
           Player2.Score ++;
           Players.children[3].textContent = Player2.Score;
        }else{
           Player1.Score ++;
           Players.children[2].textContent = Player1.Score;
        }
        document.getElementById('winner').style.visibility = 'visible'; 
        document.getElementById('winner').textContent = Name +' ha Ganado';
        return;
      };  
      //checks Draw
      if(Board.length == 5){
         document.getElementById('winner').style.visibility = 'visible';
         document.getElementById('winner').textContent = 'Empate';
         return;
         
      }
   }   
   //current play on board
   function currentPlay (Player,id) {
      document.getElementById(id).textContent = Player; 
      return;
   }
   //checks board to see if there is a victory conditions
   function checkVictory(Board){
      if(Board[2] == '3'){
        return true;
      }else if(Board[0]=='1'){
         if(Board.indexOf('4') != -1 && Board.indexOf('7') != -1){
           return true;
         }else if(Board.indexOf('5')!= -1 && Board.indexOf('9') != -1){
           return true;
         }  
      }else if(Board.indexOf('2')!= -1 && Board.indexOf('5') != -1 && Board.indexOf('8') != -1){ 
           return true;
      }else if(Board.indexOf('3')!= -1 && Board.indexOf('5') != -1 && Board.indexOf('7') != -1){ 
           return true;
      }else if(Board.indexOf('3')!= -1 && Board.indexOf('6') != -1 && Board.indexOf('9') != -1){ 
           return true;
      }else if(Board.indexOf('4')!= -1 && Board.indexOf('5') != -1 && Board.indexOf('6') != -1){ 
           return true;
      }else if(Board.indexOf('7')!= -1 && Board.indexOf('8') != -1 && Board.indexOf('9') != -1){ 
           return true;
      }
       return false;
   }

});


