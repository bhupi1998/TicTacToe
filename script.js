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
    //this function works but not well..
    const winChecker =(gameData) => {
        let prev=0;
        let curr=0;
        let win=0;
        let winForReal=0;
        let columns=[[0,3,6],[1,4,7],[2,5,8]];
        let rows=[[0,1,2],[3,4,5],[6,7,8]];
        let diagonals=[[0,4,8],[2,4,6]];
        //check rows
        for(let horiz=0;horiz<3;horiz++){
            prev=gameData[rows[horiz][0]];
            for(let horizInner=1;horizInner<3;horizInner++){
                curr=gameData[rows[horiz][horizInner]];
                if(prev==curr & curr!=undefined){
                    win++;
                }else
                    win=0;
                if(win>=2){
                    winForReal=1;
                    console.log("horiz win by "+ curr);
                    break;
                }
                prev=curr;
            }
            win=0;//reset
        }

        //check columns
        prev=0;
        curr=0;
        win=0;
        for(let collum=0;collum<3;collum++){
            prev=gameData[columns[collum][0]];
            for(let columInner=1;columInner<3;columInner++){
                curr=gameData[columns[collum][columInner]];
                if(prev==curr & curr!=undefined){
                    win++;
                }else
                    win=0;
                if(win>=2){
                    winForReal=1;
                    console.log("column win by "+ curr);
                    break;
                }
                prev=curr;
            }
            win=0;//reset
        }
        //check diagonals
        prev=0;
        curr=0;
        win=0;
        for(let diagz=0;diagz<2;diagz++){
            prev=gameData[diagonals[diagz][0]];
            for(let diagzInner=1;diagzInner<3;diagzInner++){
                curr=gameData[diagonals[diagz][diagzInner]];
                if(prev==curr & curr!=undefined){
                    win++;
                }else
                    win=0;
                if(win>=2){
                    winForReal=1;
                    console.log("diagonal win by "+ curr);
                    break;
                }
                prev=curr;
                
            }
            win=0;//reset
        }
        if(winForReal){
            console.log("you win motherfucker");
        }
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
        winChecker(gameData);
        if(round>=9){
            //check for win.
            
            
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