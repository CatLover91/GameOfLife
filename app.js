/*



*/

var gameOfLife = angular.module('gameOfLife', []);

gameOfLife.controller('BoardController', function($scope) {
    var theGame = Game();
    theGame.reset(0.3, 1000);
    $scope.board = theGame.get();
    
    
});
                      
function aliveOrDead(percent) {
    if(Math.random() < percent) {
        return true;
    } else {
        return false;
    }
}

function divineJudgement(sampleGrid) {
    var count = 0;
    for(var i = 0; i < sampleGrid.length; i++) {
        if(i != 2 && sampleGrid[i]) {
            count++;
        }
    }
    
    if(sampleGrid[2]) {
        if(count === 0 || count == 1 || count > 3) {
            //Any live cell with fewer than two live neighbours dies, as if caused by under-population.
            //Any live cell with more than three live neighbours dies, as if by overcrowding.
            return false;
        } 
        else {
            //Any live cell with two or three live neighbours lives on to the next generation.
            return true;
        }
    } else {
        if(count == 3) {
            //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
            return true;
        } else {
            return false;
        }
    }
}

function Game() {
    this.board = [];
}

Game.prototype.reset = function(boardPercentage, boardSize) {
    this.board = [];
    for(var i = 0; i < boardSize; i++) {
        var row = [];
        for(var j = 0; j < boardSize; j++) {
            row.push(aliveOrDead(boardPercentage));
        }
        this.board.push(row);
    }
};


Game.prototype.iterate = function() {
    for(var i = 0; i < this.board.length; i++) {
        for(var j = 0; j < this.board[i].length; j++) {
            var comparePoints;
            if(i === 0) {
                if(j === 0) {
                    comparePoints = [
                        this.board[this.board.length - 1][j],
                        this.board[i][this.board[i].length - 1],
                        this.board[i][j],
                        this.board[i][j + 1],
                        this.board[i + 1][j]
                    ];
                } else if(j == this.board[i].length - 1) {
                    comparePoints = [
                        this.board[i + 1][j],
                        this.board[i][j - 1],
                        this.board[i][j],
                        this.board[i][0],
                        this.board[0][j]
                    ];
                } else {
                    comparePoints = [
                        this.board[this.board.length - 1][j],
                        this.board[i][j - 1],
                        this.board[i][j],
                        this.board[i][j + 1],
                        this.board[i + 1][j]
                    ];
                }
            } else if(i == this.board.length - 1) {
                if(j === 0) {
                    comparePoints = [
                        this.board[i - 1][j],
                        this.board[this.board.length - 1][j],
                        this.board[i][j],
                        this.board[i][j + 1],
                        this.board[0][j]
                    ];
                } else if(j == this.board[i].length - 1) {
                    comparePoints = [
                        this.board[i - 1][j],
                        this.board[i][j - 1],
                        this.board[i][j],
                        this.board[i][0],
                        this.board[0][j]
                    ];
                } else {
                    comparePoints = [
                        this.board[i - 1][j],
                        this.board[i][j - 1],
                        this.board[i][j],
                        this.board[i][j + 1],
                        this.board[0][j]
                    ];
                }
            } else {
                if(j === 0) {
                    comparePoints = [
                        this.board[i - 1][j],
                        this.board[i][this.board[i].length - 1],
                        this.board[i][j],
                        this.board[i][j + 1],
                        this.board[i + 1][j]
                    ];
                } else if(j == this.board[i].length - 1) {
                    comparePoints = [
                        this.board[i - 1][j],
                        this.board[i][j - 1],
                        this.board[i][j],
                        this.board[i][0],
                        this.board[i + 1][j]
                    ];
                } else {
                    comparePoints = [
                        this.board[i - 1][j],
                        this.board[i][j - 1],
                        this.board[i][j],
                        this.board[i][j + 1],
                        this.board[i + 1][j]
                    ];
                }
            }
            
            this.board[i][j] = divineJudgement(comparePoints);
        }
    }
};

Game.prototype.get = function() {
    return this.board;
};

