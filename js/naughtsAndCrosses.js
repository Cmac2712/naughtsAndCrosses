function log(m){ console.log(m) }
//constructor function for creating new cells
function cell(id) {
    this.id = id;
    this.td = document.getElementById(id);
    this.active = false;
    this.mark = undefined;
    this.changeColor = function () {
        
        this.td.addEventListener("click", function () {
             
                
            if(board["cell" + this.id].active == false){
                
                board["cell" + this.id].active = true;
                board.count++;
                board["cell" + this.id].mark = board.turn();
                if(board["cell" + this.id].mark == "x"){
                    this.style.background = "url(img/x.png) no-repeat";
                }
                else{
                    this.style.background = "url(img/o.png) no-repeat";
                }

                board.chooseCell();

                if(board.check("o") == true){ board.winMessage("o") }
                else if(board.check("x") == true){ board.winMessage("x") }

               

            } 
            
        }) // end event listener

    } //end of method

} //end constructor function 

var board = {
    count: 0,
    init: function(){                            //constructs all the cells by looping through each one and calling the changeColor constructor function
                for( var i = 1; i < 10; i++ ){
                board["cell" + i] = new cell(i);
                board["cell" + i].changeColor();
                }
            },
    turn: function(){                             //determains whose turn it is 
            if(this.count %2 == 0){ return "o" }
        else { return "x" }
        },
    winMessage: function(msg){                     //the winning message

        if(msg == "o"){ msg = "NAUGHTS" }
            else{ msg = "CROSSES" }

        var node = document.getElementById('win');
        var newNode = document.createElement('h3');
        newNode.appendChild(document.createTextNode(msg + ' WIN!'));
        node.appendChild(newNode);
        setTimeout( function(){ board.clearBoard();  newNode.parentNode.removeChild(newNode)}, 1000);
       
    },
    check:  function(v){                            //determains if there is a line

            if(board.cell1.mark == v && board.cell2.mark == v && board.cell3.mark == v){
                return true;
            }
            else if(board.cell4.mark == v && board.cell5.mark == v && board.cell6.mark === v){
                return true;
            }
            else if(board.cell7.mark == v && board.cell8.mark == v && board.cell9.mark === v){
                return true;
            }


            else if(board.cell1.mark == v && board.cell4.mark == v && board.cell7.mark == v){
                return true;
            }
            else if(board.cell2.mark == v && board.cell5.mark == v && board.cell8.mark === v){
                return true;
            }
            else if(board.cell3.mark == v && board.cell6.mark == v && board.cell9.mark === v){
                return true;
            }

            else if(board.cell1.mark == v && board.cell5.mark == v && board.cell9.mark === v){
                return true;
            }
            else if(board.cell3.mark == v && board.cell5.mark == v && board.cell7.mark === v){
                return true;
            }
            else { return false }

    },
    clearBoard: function(){
        
                for (var i = 1; i <= 9; i++) {
                    board["cell" + i].td.style.background = '#FFF';
                    board["cell" + i].mark = undefined;
                    board["cell" + i].active = false;
                };
                board.count = 0;
                },

    reset: function(){
        var button = document.getElementById("reset");
        button.addEventListener("click", function(){
        
               board.clearBoard();
            })
        },

    chooseCell: function(){ //chooses where to place naught
        var empty = [];
        for (var i = 1; i <= 9; i++) {
            if(board["cell" + i].active == false){
                empty.push(board["cell" + i].id);
            }
        }
        var rand = empty[Math.floor(Math.random() * empty.length)];
        board.count++;
        board["cell" + rand].active = true;
        board["cell" + rand].mark = "o";
        
        setTimeout(function(){ board["cell" + rand].td.style.background = "url(img/o.png) no-repeat"; }, 200);

    }


    }//end board

board.init();
board.reset();


