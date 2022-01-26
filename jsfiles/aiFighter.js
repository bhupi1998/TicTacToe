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
    
    return {randomMove};
})();
//minimax algo function. This function is used to give the computer some 
//decision making ability.
function miniMax(board, depth, isMaximizingPlayer){
    
}