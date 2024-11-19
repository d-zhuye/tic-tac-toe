function createPlayer(name, gamePiece) {

    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;

    return {name, gamePiece, score, getScore, increaseScore};
};

function createGameboard() {
    let board = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    ];
    
    const userInput = () => prompt("X or O");
    return {board, userInput};
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

function checkWinner() {
    const {board} = createGameboard();

    board[1][0] = board[1][1] = board[1][2] = "X"

    let winner = "";

    if ( board[0][0] == board[0][1] == board[0][2] && board[0][0] !== "") {
        winner = board[0][0];
    } else if (board[1][0] == board[1][1] == board[1][2] && board[1][0] !== "") {
        console.log("we have a winner");
        winner = board[1][0];
    } else {
        console.log("error");
    }

    console.table(board);
    console.log("We have a winner" + " " + winner + " won");

    return winner;

}

checkWinner();

function gamePlay() {
   let player1 = "James"; /* prompt("Enter name of Player 1: "); */
   let player2 = "Helen";       /*prompt("Enter name of Player 2: ");*/
   firstPlayer = coinFlip(player1, player2);

   player1 = createPlayer(player1, "X");
   player2 = createPlayer(player2, "O");

   console.log(`${firstPlayer} starts first.`);
}

gamePlay();