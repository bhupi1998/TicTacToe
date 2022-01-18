//factory functions, modules and variable declerations.

const Player = (name,symbol) =>{
    const score=0;
    return {name,symbol,score};
}
//declaring these here. not sure if good idea just yet. Trying to get this working first
const player1= Player('george','X');
const player2= Player('jeff','O');

//trying to use modules to store all functions. This allows to keep the namespace clear.
const ticTacToe=(()=>{
    let gameData = [-1,-1,-1,-1,-1,-1,-1,-1,-1,]; //array is initially filled with -1 to prevent errors
    let round=0;
    let boxNumber=0;
    let clickIndex=0;
    const columns=[[0,3,6],[1,4,7],[2,5,8]];
    const rows=[[0,1,2],[3,4,5],[6,7,8]];
    const diagonals=[[0,4,8],[2,4,6]];

    const gridDiv= document.querySelector('#grid');
    const popUpWindow=document.querySelector('.userSelectionPop')
    let boxList=gridDiv.querySelectorAll(".quadrants");
    //event listeners
    gridDiv.addEventListener('click',function(e){
        let clickId=e.path[0].id;
        if(clickId == 'grid') return; //if the grid element is clicked on ignore. 
        
        clickIndex=Number(clickId.slice(3))-1; //! need to offset by 1. Should have indexed grid by 0
        //call function gameControl
        gameControl(player1,player2,clickIndex);

    });
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
    const gameControl =(player1,player2,clickIndex) =>{
        //control game here
        let gameOutcome=0; //stores the outcome of the game
        if(gameData[clickIndex] != -1) return;
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
                console.log(gameOutcome + " has won");
            }
            setTimeout(gameReset,1000);//wait 1 sec before resetting everything.
        }

    }
    return {}
})();

