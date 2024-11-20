function createPlayer(name, gamePiece) {

    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;
    const winMessage = () => {
        console.log(name + " won!");
    }

    return {name, gamePiece, score, getScore, increaseScore, winMessage};
};

function createGameboard(gamepiece, player1, player2) {
    let board = [];
    let gamePiece = gamepiece;

    const createTiles = () => {
        const gameboard = document.getElementById("gameboard");
        gameboard.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const tile = document.createElement("button");
            tile.classList.add("tile");
            tile.addEventListener("click",(event) => {
                event.stopPropagation();
                tile.textContent = gamePiece;
                checkWinner(board, player1, player2);

                if (gamePiece == player1.gamePiece) {
                    gamePiece = player2.gamePiece;
                } else {
                    gamePiece = player1.gamePiece;
                }
            })
            board.push(tile);
            gameboard.appendChild(tile);
        }
    }
    return {createTiles}
}

function checkWinner(board, player1, player2) {
    let winner;
    let winningConditions = [
        // Horizontal Win Conditions
        [board[0].textContent, board[1].textContent, board[2].textContent],
        [board[3].textContent, board[4].textContent, board[5].textContent],
        [board[6].textContent, board[7].textContent, board[8].textContent],

        // Vertical Win Conditions
        [board[0].textContent, board[3].textContent, board[6].textContent],
        [board[1].textContent, board[4].textContent, board[7].textContent],
        [board[2].textContent, board[5].textContent, board[8].textContent],

        // Diagonal Win Conditions
        [board[0].textContent, board[4].textContent, board[8].textContent],
        [board[6].textContent, board[4].textContent, board[2].textContent],
    ];

    // Check through each win condition array, and ensure that every value 
    // equals one another
    winningConditions.forEach((arr) => {
        let result = arr.every((val) => val === arr[0] && val != "");
        if (result) {
            if (arr[0] == "X") {
                winner = player1.name;
                player1.increaseScore();
            } else {
                winner = player2.name;
                player2.increaseScore();
            }
        }
    })

    if (winner) {
        console.log("we have a winner!" + winner);
    }
}

function coinFlip(player1, player2) { 
    let coin = Math.random() * 100;
    let firstPlayer;
    if (coin <= 50) {
        firstPlayer = player1;
    } else {
        firstPlayer = player2;
    }
    console.log(coin + ":" + firstPlayer);
    return firstPlayer;
}

function startGame() {
   let player1 = "James"; /* prompt("Enter name of Player 1: "); */
   let player2 = "Helen";       /*prompt("Enter name of Player 2: ");*/
   firstPlayer = coinFlip(player1, player2);

   player1 = createPlayer(player1, "X");
   player2 = createPlayer(player2, "O");

   console.log(`${firstPlayer} starts first.`);

   let game = createGameboard(firstPlayer.gamePiece, player1, player2);
   game.createTiles();
}

startGame();