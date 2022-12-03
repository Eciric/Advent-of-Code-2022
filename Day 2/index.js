fs = require('fs');

const fileName = "./data.txt";

const gameState = {
    "lose": 0,
    "draw": 3,
    "win": 6
}

const gameWinConditionEnemy = {
    "A": "Z", // Rock beats scissors
    "B": "X", // Paper beats rock
    "C": "Y" // Scissors beat paper
}

const gameLoseConditionEnemy = {
    "A": "Y",
    "B": "Z",
    "C": "X"
}

const gameWinConditionMe = {
    "X": "C", // Rock beats scissors
    "Y": "A", // Paper beats rock
    "Z": "B" // Scissors beat paper
}

const gameSolveCondition = {
    "X": "lose",
    "Y": "draw",
    "Z": "win"
}

const columnChoices = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3
}

function calculateTotalScore(data) {
    const dataArray = data.split('\r\n');
    let totalScore = 0;
    dataArray.forEach((row, i) => {
        const choiceArray = row.split(' ');
        if (choiceArray.length === 2) {
            const enemyChoice = choiceArray[0];
            const myChoice = choiceArray[1];
            
            let roundStateEval = 0;

            if (gameWinConditionEnemy[enemyChoice] === myChoice) {
                roundStateEval = gameState["lose"];
            } else if (gameWinConditionMe[myChoice] === enemyChoice) {
                roundStateEval = gameState["win"];
            } else {
                roundStateEval = gameState["draw"];
            }
    
            const roundEval = columnChoices[myChoice] + roundStateEval;
    
            totalScore += roundEval;
        }
    })
    return totalScore;
}

function calculateTotalScorePartTwo(data) {
    const dataArray = data.split('\r\n');
    let totalScore = 0;
    dataArray.forEach((row, i) => {
        const choiceArray = row.split(' ');
        if (choiceArray.length === 2) {
            const enemyChoice = choiceArray[0];
            const choiceToMake = choiceArray[1];
            let myChoice = "X";

            let roundStateEval = 0;

            if (gameSolveCondition[choiceToMake] === "lose") {
                myChoice = gameWinConditionEnemy[enemyChoice];
                roundStateEval = gameState["lose"];
            } else if (gameSolveCondition[choiceToMake] === "draw") {
                myChoice = enemyChoice;
                roundStateEval = gameState["draw"];
            } else {
                myChoice = gameLoseConditionEnemy[enemyChoice]
                roundStateEval = gameState["win"];
            }
    
            const roundEval = columnChoices[myChoice] + roundStateEval;
    
            totalScore += roundEval;
        }
    })
    return totalScore;
}

fs.readFile(fileName, 'UTF-8', (_, data) => {
    console.log(calculateTotalScore(data));
    console.log(calculateTotalScorePartTwo(data));
});