class Game {
    constructor() {
        this.inProgress = true;
        this.winner = null; // either 'O' or 'X'
        this.currentTurn = Game.O; // either 'O' or 'X'
        this.movesMade = 0;
        this.squares = new Array(9).fill().map( s => new Square());
    }
}

Game.O = 'O';
Game.X = 'X';