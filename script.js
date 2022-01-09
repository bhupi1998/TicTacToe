let gameData = [];
const gridDiv= document.querySelector('#grid');
let boxList=gridDiv.querySelectorAll(".quadrants");
//Display data updates the grid layout when called
function displayData(gameData,gridBlockIndex){
    let nodeQ= gridDiv.querySelector(`#${boxList[gridBlockIndex].id}`);
    nodeQ.innerHTML=`${gameData[gridBlockIndex]}`;
}

gridDiv.addEventListener('click',function(e){
    let clickId=e.path[0].id;
    let boxNumber=0;
    let clickIndex=0;
    if(clickId == 'grid') return; //if the grid element is clicked on ignore. 
    clickIndex=Number(clickId.slice(3))-1; //! need to offset by 1. Should have indexed grid by 0
    console.log(clickIndex);
    gameData[clickIndex]='O';
    console.log(gameData);
    displayData(gameData,clickIndex);
});

//Displays random numbers in the grid
// setInterval(function(){    
//     for(let i=0;i<gameData.length;i++){
//         gameData[i]=Math.floor(Math.random()*100);
//     }
//     displayData(gameData);
// },1000);