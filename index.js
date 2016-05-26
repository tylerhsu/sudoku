'use strict';

var _ = require('underscore'),
    input = [
        [0,4,8,1,0,0,0,0,0],
        [0,0,0,0,0,9,4,6,0],
        [9,6,7,0,0,0,0,0,0],
        [0,0,0,5,3,6,0,0,0],
        [5,1,6,0,0,0,3,7,8],
        [0,0,0,8,1,7,0,0,0],
        [0,0,0,0,0,0,6,9,4],
        [0,9,2,3,0,0,0,0,0],
        [0,0,0,0,0,5,8,3,0]
    ];

console.log(solve(input));


function solve(grid) {
    var space = getOpenSpace(grid),
        solution;

    if (!space) {
        return grid;
    }

    if (space.moves.length === 0) {
        return null;
    }

    for (var n = 0; n < space.moves.length; n++) {
        grid[space.row][space.col] = space.moves[n];
        
        solution = solve(grid);

        if (solution) {
            return solution;
        } else {
            grid[space.row][space.col] = 0;
        }
    }

    return null;
}

function getOpenSpace(grid) {
    var spaces = [];
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                spaces.push({
                    row: i,
                    col: j,
                    moves: getLegalMoves(grid, i, j)
                });
            }
            
        };
    };

    return spaces.sort((a, b) => {
        return a.moves.length - b.moves.length;
    })[0];
}

function getRow(grid, row, col) {
    return grid[row];
}

function getCol(grid, row, col) {
    return grid.map(arr => {
        return arr[col];
    });
}

function getSquare(grid, row, col) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    return _.flatten(grid.slice(row, row + 3).map(r => {
        return r.slice(col, col + 3);
    }));
}

function getLegalMoves(grid, row, col) {
    var filled = _.chain(getRow(grid, row, col).concat(getCol(grid, row, col)).concat(getSquare(grid, row, col)))
            .uniq()
            .reject(val => {
                return val === 0;
            })
            .value();
    return _.difference([1,2,3,4,5,6,7,8,9], filled);
}
