var x = "x",
         o = "o",
         cell = "cell",
         msgX = "CROSSES", //Defines what the winning message will be for X
         msgO = "NAUGHTS";

function cells(id) { //constructor function for creating new cells

    this.id = id;
    this.td = document.getElementById(id); //gets the value of the table cell depending on the id given
    this.active = false;
    this.mark = undefined;
    this.addMark = function () { //add either a naught or a cross

        this.td.addEventListener("click", function () {


            if (board[cell + this.id].active == false) { // if cell is not active i.e empty

                board[cell + this.id].active = true; //set it to active 
                board.count++; //adds 1 to count after each turn
                board[cell + this.id].mark = board.turn(); //retreives either 'x' or 'o' players turn
                if (board[cell + this.id].mark == x) { //sets bckground of the table cell to either and x or o accordingly
                    this.style.background = "url(http://imgur.com/2s28RcS.png) no-repeat"; //places X image
                }

                if (board.check(o) != true && board.check(x) != true) { // makes sure the game isnt won before placing a naught

                    board.chooseCell(); //calls the choose cell function   

                }

                if (board.check(o) == true) {
                    board.winMessage(o)
                } //passes either x or o into winMessage function
                else if (board.check(x) == true) {
                    board.winMessage(x)
                }



            }

        })

    }

}

var board = {
    count: 0,
    init: function () { //constructs all the cells by looping through each one and calling the addMark constructor function
        for (var i = 1; i < 10; i++) {
            board[cell + i] = new cells(i);
            board[cell + i].addMark();
        }
    },
    turn: function () { //determains whose turn it is deoending on wether the count is odd or even
        if (this.count % 2 == 0) {
            return o
        } else {
            return x
        }
    },
    writeMessage: function (msg) { //writes message to the documen
        var node = document.getElementById('win');
        var newNode = document.createElement('h3');
        newNode.appendChild(document.createTextNode(msg + ' WIN!'));
        node.appendChild(newNode);
        setTimeout(function () {
            board.clearBoard();
            newNode.parentNode.removeChild(newNode)
        }, 1000);
    },
    winMessage: function (msg) { //the winning message
        board.complete = true;
        if (msg == o) {
            msg = msgO
        } //displays the winning messages for X or O
        else {
            msg = msgX
        }

        board.writeMessage(msg);
    },
    check: function (v) { //determains if there is a line


            function compare(start, end, add) { //loops through cells between <start> and <end> and checks them for x or o. <add> variable skips over cells 
                var trues = 0;

                    for( var i = start; i <= end; i+= add ){
                        if( board[cell + i].mark == v ){ trues ++}
                        if( trues == 3 ){  return true }
                        }
                }

            var line = compare(1, 3, 1) || compare(4, 6, 1) || compare(7, 9, 1) ||
                       compare(1, 7, 3) || compare(2, 8, 3) || compare(3, 9, 3) ||
                       compare(1, 9, 4) || compare(3, 7, 2);
                       
            return line;


    },
    clearBoard: function () { //loops through each cell setting it's values back to default

        for (var i = 1; i <= 9; i++) {
            board[cell + i].td.style.background = '#FFF';
            board[cell + i].mark = undefined;
            board[cell + i].active = false;
        };
        board.count = 0;
    },

    reset: function () { //adds an event listener to a button which calls the clearBoard function
        var button = document.getElementById("reset");
        button.addEventListener("click", function () {

            board.clearBoard();
        })
    },

    chooseCell: function () { //chooses which cell the computer will place the naught
        var empty = []; //loops through an array of cells nd pushes them to an array if they are empty

        for (var i = 1; i <= 9; i++) {
            if (board[cell + i].active == false) {
                empty.push(board[cell + i].id);
            }
        }
        var rand = empty[Math.floor(Math.random() * empty.length)]; //chooses a random empty cell from the array
        board.count++;
        if (empty.length == 0) {
            return
        } //if the array is empty a function is exited to avoid an error where the function can't find a random empty cell 
        board[cell + rand].active = true;
        board[cell + rand].mark = o;

        setTimeout(function () {
            board[cell + rand].td.style.background = "url(http://i.imgur.com/yMIIoOh.png) no-repeat";
        }, 200); //adds naught after a specified time 
    }



} //end board

board.init(); //calling the initialize function
board.reset(); //initializing the event listener on 'RESET' button
