class Player {
    constructor(name, symbol) {
        this.name = name; 
        this.symbol = symbol;
    }
}

class Game {
    constructor(player1, player2) {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ];
        this.currentPlayer = player1;
        this.players = [player1, player2];
    }
    printBoard() {
        console.log('  0 1 2');

        for (let i = 0; i < 3; i++) {
          let row = `${i} `; 
    
          
          for (let j = 0; j < 3; j++) {
            row += `${this.board[i][j]} `; 
          }
    

          console.log(row);
        }
      }
    isValidMove(row, col) {
        return this.board[row][col] === ' ';
    }
    makeMove(row, col) {
        if (this.isValidMove(row, col)) {
            this.board[row][col] = this.currentPlayer.symbol;
            this.printBoard();
            this.switchPlayer();
        } else {
            console.log('Invalid move. Try again.');
        }
    }
    checkWin(){
        for(let i = 0; i < 3; i++); 
        if (
            this.board[i][0] === this.currentPlayer.symbol &&
            this.board[i][1] === this.currentPlayer.symbol &&
            this.board[i][2] === this.currentPlayer.symbol
            ) { 
                return true;
            }
        if (
            this.board[0][i] === this.currentPlayer.symbol &&
            this.board[1][i] === this.currentPlayer.symbol &&
            this.board[2][i] === this.currentPlayer.symbol
            ) { 
                return true
            }

        if (
            this.board[0][0] === this.currentPlayer.symbol &&
            this.board[1][1] === this.currentPlayer.symbol &&
            this.board[2][2] === this.currentPlayer.symbol
        ) {
            return true;
        }

        if (
            this.board[0][2] === this.currentPlayer.symbol &&
            this.board[1][1] === this.currentPlayer.symbol &&
            this.board[2][0] === this.currentPlayer.symbol
        ) {
            return true;
        }

        return false;
    }

    checkDraw() {
        for( let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(this.board[i][j] === ' ') {
                    return false;
                }
            }
        }
        return !this.checkWin();

    }

    switchPlayer() {
        if(this.currentPlayer === this.players[0]) {
            this.currentPlayer = this.players[1]
        } else {
            this.currentPlayer = this.players[0];
        }
    }

}

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const boardContainer = document.getElementById('boardContainer');
    let ticTacToeGame;
  
    startButton.addEventListener('click', startGame);

    function startGame() {
        const player1 = new Player('player1', 'X');
        const player2 = new Player('player2', 'O');

        ticTacToeGame = new Game (player1, player2);

        boardContainer.innerHTML = '';
        createBoardUI();
    
       
        ticTacToeGame.printBoard();
    } 

    function createBoardUI() {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                const cell = document.createElement('div'); 
                cell.className = 'cell'; 
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', handleCellClick);
                boardContainer.appendChild(cell); 
            }
            boardContainer.appendChild(document.createElement('br'));
        }
    }
    function handleCellClick(event) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        console.log(`Clicked on cell (${row}, ${col})`);
    

        ticTacToeGame.makeMove(row, col);
    

        if (ticTacToeGame.checkWin()) {
          alert(`Player ${ticTacToeGame.currentPlayer.symbol} wins!`);
          startGame(); 
        } else if (ticTacToeGame.checkDraw()) {
          alert('It\'s a draw!');
          startGame(); 
        } else {
          ticTacToeGame.switchPlayer();
        }
      }
      startGame();
});