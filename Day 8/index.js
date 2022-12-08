fs = require('fs');

const fileName = './data.txt';

const forest = [];

fs.readFile(fileName, 'UTF-8', (_, data) => {
    parseTreesIntoTheForest(data.split('\r\n'));
    console.log(findAllVisibleTrees());
    console.log(findHighestScenicScore());
})

function parseTreesIntoTheForest(data) {
    data.forEach(line => {
        if (line.length) {
            let treeRow = [];
            for (let tree of line) {
                treeRow.push(Number(tree));
            }
            forest.push(treeRow);
        }
    })
}

function findAllVisibleTrees() {
    let visibleTreesSum = 0;
    for (let i = 1; i < forest.length - 1; i++) {
        for (let j = 1; j < forest[i].length - 1; j++) {
            if (checkVisiblityAbove(i, j) || checkVisiblityBelow(i, j) || checkVisiblityLeft(i, j) || checkVisiblityRight(i, j)) {
                visibleTreesSum++;
            }
        }
    }
    const allBorderTrees = forest.length * 2 + (forest[0].length-2)*2;
    visibleTreesSum += allBorderTrees;
    return visibleTreesSum;
}

function checkVisiblityAbove(i, j) {
    let visible = true;
    let height = forest[i][j];
    for (let x = i-1; x >= 0; x--) {
        if (forest[x][j] >= height) {
            visible = false;
        } 
    }
    return visible;
}

function checkVisiblityBelow(i, j) {
    let visible = true;
    let height = forest[i][j];
    for (let x = i+1; x < forest.length; x++) {
        if (forest[x][j] >= height) {
            visible = false;
        } 
    }
    return visible;
}

function checkVisiblityLeft(i, j) {
    let visible = true;
    let height = forest[i][j];
    for (let x = j-1; x >= 0; x--) {
        if (forest[i][x] >= height) {
            visible = false;
        } 
    }
    return visible;
}

function checkVisiblityRight(i, j) {
    let visible = true;
    let height = forest[i][j];
    for (let x = j+1; x < forest[i].length; x++) {
        if (forest[i][x] >= height) {
            visible = false;
        } 
    }
    return visible;
}

function findHighestScenicScore() {
    let currentHighestScore = 0;
    for (let i = 1; i < forest.length-1; i++) {
        for (let j = 1; j < forest[i].length-1; j++) {
            let currentTreeScore = getLeftScenicScore(i, j) * getRightScenicScore(i, j) * getAboveScenicScore(i, j) * getBelowScenicScore(i, j);
            if (currentTreeScore > currentHighestScore) currentHighestScore = currentTreeScore; 
        }
    }
    return currentHighestScore;
}

function getLeftScenicScore(i, j) {
    let score = 0;
    let height = forest[i][j];
    for (let x = j-1; x >= 0; x--) {
        if (forest[i][x] >= height) {
            score++;
            break;
        } else {
            score++;
        }
    }
    return score;
}

function getRightScenicScore(i, j) {
    let score = 0;
    let height = forest[i][j];
    for (let x = j+1; x < forest[i].length; x++) {
        if (forest[i][x] >= height) {
            score++;
            break;
        } else {
            score++;
        }
    }
    return score;
}

function getBelowScenicScore(i, j) {
    let score = 0;
    let height = forest[i][j];
    for (let x = i+1; x < forest.length; x++) {
        if (forest[x][j] >= height) {
            score++;
            break;
        } else {
            score++;
        }
    }
    return score;
}

function getAboveScenicScore(i, j) {
    let score = 0;
    let height = forest[i][j];
    for (let x = i-1; x >= 0; x--) {
        if (forest[x][j] >= height) {
            score++;
            break;
        } else {
            score++;
        }
    }
    return score;
}