//factory functions, modules and variable declerations.
const GAME_RESET_TIMEOUT=500;

const Player = (name,symbol) =>{
    const score=0;
    return {name,symbol,score};
}
//setting default player vals
let player1=Player("Player1",'X');
let player2=Player('Player2','O');

const gridDiv= document.querySelector('#grid');
const popUpWindow=document.querySelector('#userSelectionPop')
const popUpSubmit=popUpWindow.querySelector('#popUpSubmit');
const boxList=gridDiv.querySelectorAll(".quadrants");
const player1ScoreName=document.querySelector('#player1ScoreName'); 
const player2ScoreName=document.querySelector('#player2ScoreName'); 
const player1ScoreDisplay=document.querySelector('#player1Score');
const player2ScoreDisplay=document.querySelector('#player2Score');
const winnerPopUp=document.querySelector('#winnerPopUp')
const gameResetPopUp=document.querySelector('#restartGamePopUp');
const gameResetExternal=document.querySelector('#restartGameExternal');
const overLay=document.querySelector('.overlayDiv');

let clickIndex=0;
let gameData = [-1,-1,-1,-1,-1,-1,-1,-1,-1,]; //array is initially filled with -1 to prevent errors
var round=0;
//trying to use modules to store all functions. This allows to keep the namespace clear.
const ticTacToe=(()=>{
    let boxNumber=0;
    //array positions to check
    const columns=[[0,3,6],[1,4,7],[2,5,8]];
    const rows=[[0,1,2],[3,4,5],[6,7,8]];
    const diagonals=[[0,4,8],[2,4,6]];


    //checks if values in given array are all the same
    const allEqual = arr => arr.every(v => v === arr[0]); //TODO understand this https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
    //Display data updates the grid layout when called
    const displayData = (gameData,gridBlockIndex) =>{
        let nodeQ= gridDiv.querySelector(`#${boxList[gridBlockIndex].id}`);
        nodeQ.innerHTML=`${gameData[gridBlockIndex]}`;
    }

    const arrayControl = (symbol,clickIndex) =>{
        gameData[clickIndex]=symbol; 
    }
//patternChecker will take the data from the game, check it using the patter defined and then return true or false if there is a winner. 
    const patternChecker=(data,patternToCheck)=>{
        let toReturn=-1;
        let tempArray = []; //used to temporarily store values that will be compared later
        let patternSubArrays=patternToCheck.length
        for(let i=0;i<patternSubArrays;i++){ //outerloop for each pattern sub array
            for(let l=0;l<3;l++){ //goes through each element and stores in tempArray. There always only 3 elements 
                tempArray[l]=data[patternToCheck[i][l]];
            }
            if(allEqual(tempArray) & tempArray[0]!= -1){
                toReturn=tempArray[0];
                i=patternSubArrays+1; //forces for loops to exit immidiately 
                break;
            }
        }
        return toReturn;
    }
    //this function works but not well..
    const winChecker =(gameData,round) => {
        let resultRows=-1;
        let resultCols=-1;
        let resultDiag=-1;
        resultRows=patternChecker(gameData,rows);
        resultCols=patternChecker(gameData,columns);
        resultDiag=patternChecker(gameData,diagonals);
        //declare game outcome
        if(resultRows!=-1){
            return resultRows;
        }
        else if(resultCols!=-1){
            return resultCols;
        }
        else if(resultDiag!=-1){
            return resultDiag;
        }else if(round>=9)
            return -1; //no winner found.
        return 0;
        //end game
    }
    const gameReset=()=>{
        gameData=[-1,-1,-1,-1,-1,-1,-1,-1,-1,];
        for(i=0;i<9;i++){
            let nodeQ= gridDiv.querySelector(`#${boxList[i].id}`);
            nodeQ.innerHTML='';
            round=0;
        }
    }
    const gameEnd=(winner)=>{
        gameReset();
        winnerPopUp.style.display="flex";
        overLay.style.zIndex='2';
        winnerPopUp.querySelector('.playerWinner').innerHTML=`${winner.name}`;
    }
    const updateScore=(player1,player2,gameOutcome)=>{
        if(gameOutcome === player1.symbol){
            player1.score++;
        }
        else if(gameOutcome === player2.symbol){
            player2.score++;
        }
        player1ScoreDisplay.innerHTML=`${player1.score}`;
        player2ScoreDisplay.innerHTML=`${player2.score}`;
        if(player1.score>=3){
            //game over
            gameEnd(player1);
        }
        else if(player2.score>=3){
            //game over
            gameEnd(player2);
        }
    }
    const gameControl =(player1,player2,clickIndex) =>{
        //control game here
        let gameOutcome=0; //stores the outcome of the game
        if(gameData[clickIndex] != -1) return 1;
        if(round%2 == 0){
            arrayControl(player1.symbol,clickIndex);
            displayData(gameData,clickIndex);
        }
        else{
            arrayControl(player2.symbol,clickIndex);
            displayData(gameData,clickIndex); 
        }
        round++;
        gameOutcome=winChecker(gameData,round);
        if(gameOutcome!=0){
            if(gameOutcome==-1){
                console.log("It's a tie!");
            }else{
                updateScore(player1,player2,gameOutcome);
            }
            setTimeout(gameReset,GAME_RESET_TIMEOUT);//wait 1 sec before resetting everything.
        }
        return 0;
    }
    return {gameControl,gameReset}
})();

/*****************************************************Event Listeners******************************************************************************************************** */

//event listeners
gridDiv.addEventListener('click',function(e){
    let clickId=e.path[0].id;
    if(clickId == 'grid') return; //if the grid element is clicked on ignore. 
    
    clickIndex=Number(clickId.slice(3))-1; //! need to offset by 1. Should have indexed grid by 0
    //call function gameControl
    ticTacToe.gameControl(player1,player2,clickIndex);
    //used for ai system
    if(round%2!=0){
        aiFighter.randomMove();
    }
});

gameResetPopUp.addEventListener('click',function(){
    winnerPopUp.style.display="none";
    popUpWindow.style.display='flex';
    player1.score=0;
    player2.score=0;
    player1ScoreDisplay.innerHTML=`${player1.score}`;
    player2ScoreDisplay.innerHTML=`${player2.score}`;
    ticTacToe.gameReset();
});
gameResetExternal.addEventListener('click',function(){
    winnerPopUp.style.display="none";
    popUpWindow.style.display='flex';
    player1.score=0;
    player2.score=0;
    player1ScoreDisplay.innerHTML=`${player1.score}`;
    player2ScoreDisplay.innerHTML=`${player2.score}`;
    ticTacToe.gameReset();
});
popUpSubmit.addEventListener('click',function(){
    let player1Name=document.querySelector('#player1Name').value;
    let player2Name=document.querySelector('#player2Name').value;
    if(player1Name)
        player1= Player(player1Name,'X');
    if(player2Name)
        player2= Player(player2Name,'O');
    player1ScoreName.innerHTML=`${player1.name}`;
    player2ScoreName.innerHTML=`${player2.name}`;
    popUpWindow.style.display='none';
    overLay.style.zIndex='-2';
});
/*******************************************************AI Controls******************************************************************************************* */
const aiFighter = (()=>{
    const randomMove = () =>{
        let randomNumber=-2;
        while(ticTacToe.gameControl(player1,player2,randomNumber)){
            randomNumber=Math.floor(Math.random()*10); 
        }
        
    }
    return {randomMove};
})();