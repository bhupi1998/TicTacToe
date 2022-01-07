let gameData = [9,8,7,6,5,4,3,2,1];
const gridDiv= document.querySelector('#grid');
let boxList=gridDiv.querySelectorAll(".box1");
gridDiv.addEventListener('click',function(e){
    console.log(e.path[0].className);
});

function displayData(gameData){
    for(let i=0;i<gameData.length;i++){

    }
}