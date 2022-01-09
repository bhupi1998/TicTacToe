let gameData = [];
const gridDiv= document.querySelector('#grid');
let boxList=gridDiv.querySelectorAll(".quadrants");
//event listeners
gridDiv.addEventListener('click',function(e){
    let clickId=e.path[0].id;
    let boxNumber=0;
    let clickIndex=0;
    if(clickId == 'grid') return; //if the grid element is clicked on ignore. 
    clickIndex=Number(clickId.slice(3))-1; //! need to offset by 1. Should have indexed grid by 0
    console.log(clickIndex);
    gameData[clickIndex]='O';
    console.log(gameData);
    ticTacToe.displayData(gameData,clickIndex);
});

//factory functions
const Player = (name,symbol) =>{
    return {name,symbol};
}
//trying to use modules to store all functions
const ticTacToe=(()=>{
    //Display data updates the grid layout when called
    const displayData = (gameData,gridBlockIndex) =>{
        let nodeQ= gridDiv.querySelector(`#${boxList[gridBlockIndex].id}`);
        nodeQ.innerHTML=`${gameData[gridBlockIndex]}`;  
    }
    return {displayData}
})();
const player1= Player('george','X');
const player2= Player('jeff','O');
//Displays random numbers in the grid
// setInterval(function(){    
//     for(let i=0;i<gameData.length;i++){
//         gameData[i]=Math.floor(Math.random()*100);
//         displayData(gameData,i);
//     }
    
// },200);