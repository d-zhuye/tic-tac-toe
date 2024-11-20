let isGameActive;

function createPlayer(name, gamePiece, color) {

    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;
    return {name, gamePiece, color, getScore, increaseScore};
};

player1 = createPlayer("Player 1", "X", "rgb(218, 165, 32)");
player2 = createPlayer("Player 2", "O", "rgb(106, 90, 205)");


function createGameboard(gamepiece, player1, player2) {
    let board = [];
    let gamePiece = gamepiece;

    const turnIndicator = () => {
        const greenBackground = "rgb(107, 142, 35, 20%)";
        const indicator1 = document.getElementById("player1");
        const indicator2 = document.getElementById("player2");
        if (gamePiece == "X") {
            indicator1.style.backgroundColor = greenBackground;
            indicator1.style.borderWidth = "3px";
            indicator2.style.backgroundColor = "white";
            indicator2.style.borderWidth = "0px";
        } else if (gamePiece == "O") {
            indicator1.style.backgroundColor = "white";
            indicator1.style.borderWidth = "0px";
            indicator2.style.backgroundColor = greenBackground;
            indicator2.style.borderWidth = "3px";
        }
    }

    const createTiles = () => {
        const gameboard = document.getElementById("gameboard");
        gameboard.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const tile = document.createElement("button");
            tile.classList.add("tile");
            tile.addEventListener("click", (event) => {
                event.stopPropagation();
                if (isGameActive && tile.textContent === "") {
                    if (gamePiece == player1.gamePiece) {
                        tile.style.color = player1.color;
                    } else {
                        tile.style.color = player2.color;
                    }

                    tile.textContent = gamePiece;
                    checkWinner(board, player1, player2);

                    if (gamePiece == player1.gamePiece) {
                        gamePiece = player2.gamePiece;
                    } else {
                        gamePiece = player1.gamePiece;
                    }

                    turnIndicator();
                }
            })
            board.push(tile);
            gameboard.appendChild(tile);
        }
    }
    return {turnIndicator, createTiles }
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
                winner = player1;
                player1.increaseScore();
            } else {
                winner = player2;
                player2.increaseScore();
            }
            isGameActive = false;
            displayScore(player1, player2);
            annoucement(winner);
        }
    })
}

function displayScore(player1, player2) {
    const player1Score = document.getElementById("player1-score");
    const player2Score = document.getElementById("player2-score");

    player1Score.textContent = player1.getScore();
    player2Score.textContent = player2.getScore();
}

function annoucement(firstPlayer, winner) {
    const announcement = document.getElementById("announcement");
    
    if (winner === player1) {
        announcement.textContent = `${player1.name} Wins!`;
    } else if (winner === player2) {
        announcement.textContent = `${player2.name} Wins!`;
    }
}

function clearAnnouncement() {
    const clear = document.getElementById("announcement");
    clear.textContent = "";
}
function coinFlip(player1, player2) {
    let coin = Math.random() * 100;
    let firstPlayer;
    if (coin <= 50) {
        firstPlayer = player1;
    } else {
        firstPlayer = player2;
    }
    return firstPlayer;
}

function startGame() {
    firstPlayer = coinFlip(player1, player2);
    const announcement = document.getElementById("announcement");
    announcement.textContent = `${firstPlayer.name} starts first.`;
    let game = createGameboard(firstPlayer.gamePiece, player1, player2);
    game.createTiles();
    game.turnIndicator();

}

(function setUp() {
    const startButton = document.getElementById("start");
    startButton.addEventListener("click", (event) => {
        event.stopPropagation();
        if (!isGameActive) {
            isGameActive = true;
            clearAnnouncement();
            startGame();

        }
    })
})();

