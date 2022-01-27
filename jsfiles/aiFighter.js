/*******************************************************AI Controls******************************************************************************************* */
//module for ai
//matchOutcome!='-' && matchOutcome!=-10 && matchOutcome!=10 && matchOutcome !=0)
        // possible matchOutcomes: +-10 if a player won
        //                          0 if it's a tie
        //                          1 if spot is taken
        //                          - default. game can carry on
const aiFighter = (()=>{
    const randomMove = () =>{
        let randomNumber=-2;
        let matchOutcome;
        do{
            matchOutcome=ticTacToe.gameControl(player1,player2,randomNumber);
            randomNumber=Math.floor(Math.random()*10); 
        }while(matchOutcome==1)
    }
    const findBestMove= (board,symbol) =>{
        let bestMove= -Infinity;
        let bestScore=Infinity;
        for(let i=0;i<board.length;i++){
            if(board[i]==-1){ //means position is empty 
                board[i]=symbol;
                let score=miniMax(board,0,false);
                if(score<bestScore){
                    bestScore=score;
                    bestMove=i;
                }
                //do stuff
                board[i]=-1;//clear it again.
            }
        }
        return bestMove;
    }
    return {randomMove,findBestMove};
})();
//minimax algo function. This function is used to give the computer some 
//decision making ability.
function miniMax(board, depth, isMaximizingPlayer){
    let gameStatus=ticTacToe.winChecker(board);
    if(gameStatus!=='-'){ // if '-' is not returned it means that the game is finished
        let toReturn;
        switch(gameStatus){
            case player1.symbol:
                toReturn=10;
                break;
            case player2.symbol:
                toReturn=-10;
                break;
            case 0:
                toReturn=0;
        } 
        return toReturn;//+10 for p1, -10 for p2
    }
    if(isMaximizingPlayer){
        let bestVal=-Infinity;
        for(let i=0;i<board.length;i++){
            if(board[i]==-1){
                board[i]=player2.symbol;
                let value=miniMax(board,depth,false);
                board[i]=-1;
                bestVal=Math.max(bestVal,value);
            }
        }
        return bestVal
    }
    else{
        let bestVal=Infinity;
        for(let i=0;i<board.length;i++){
            if(board[i]==-1){
                board[i]=player1.symbol;
                let value=miniMax(board,depth,true);
                board[i]=-1;
                bestVal=Math.min(bestVal,value);
            }
        }
        return bestVal        
    }
}