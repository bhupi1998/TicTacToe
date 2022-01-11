//factory functions, modules and variable declerations.

const Player = (name,symbol) =>{
    return {name,symbol};
}

//trying to use modules to store all functions. This allows to keep the namespace clear.
const ticTacToe=(()=>{
    let gameData = [];
    let round=0;
    let boxNumber=0;
    let clickIndex=0;
    //declaring these here. not sure if good idea just yet. Trying to get this working first
    const player1= Player('george','X');
    const player2= Player('jeff','O');
    const gridDiv= document.querySelector('#grid');
    let boxList=gridDiv.querySelectorAll(".quadrants");
    //event listeners
    gridDiv.addEventListener('click',function(e){
        let clickId=e.path[0].id;
        if(clickId == 'grid') return; //if the grid element is clicked on ignore. 
        
        clickIndex=Number(clickId.slice(3))-1; //! need to offset by 1. Should have indexed grid by 0
        //call function gameControl
        gameControl(player1,player2,clickIndex);

    });

    //Display data updates the grid layout when called

    const displayData = (gameData,gridBlockIndex) =>{
        let nodeQ= gridDiv.querySelector(`#${boxList[gridBlockIndex].id}`);
        nodeQ.innerHTML=`${gameData[gridBlockIndex]}`;
    }

    const arrayControl = (symbol,clickIndex) =>{
        gameData[clickIndex]=symbol; 
    }

    const winChecker =(gameData) => {
        let columns=[[0,3,6],[1,4,7],[2,5,8]];
        let rows=[[0,1,2],[3,4,5],[6,7,8]];
        let diagonals=[[0,4,8][2,4,6]];
        //check rows
        for(let horiz=0;horiz<2;horiz++){

        }
        //check columns
        //check diagonals
    }
    const gameControl =(player1,player2,clickIndex) =>{
        //control game here
        if(gameData[clickIndex] != undefined) return;
        if(round%2 == 0){
            arrayControl(player1.symbol,clickIndex);
            displayData(gameData,clickIndex);
        }
        else{
            arrayControl(player2.symbol,clickIndex);
            displayData(gameData,clickIndex); 
        }
        round++;
        if(round>9){
            //check for win.
            winChecker(gameData);
        }
    }
    return {displayData}
})();

//Displays random numbers in the grid
// setInterval(function(){    
//     for(let i=0;i<gameData.length;i++){
//         gameData[i]=Math.floor(Math.random()*100);
//         displayData(gameData,i);
//     }
    
// },200);