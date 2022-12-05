fs = require('fs');

const fileName = './data.txt';

const stacks = [
    ['Z', 'P', 'M', 'H', 'R'],
    ['P', 'C', 'J', 'B'],
    ['S', 'N', 'H', 'G', 'L', 'C', 'D'],
    ['F', 'T', 'M', 'D', 'Q', 'S', 'R', 'L'],
    ['F', 'S', 'P', 'Q', 'B', 'T', 'Z', 'M'],
    ['T', 'F', 'S', 'Z', 'B', 'G'],
    ['N', 'R', 'V'],
    ['P', 'G', 'L', 'T', 'D', 'V', 'C', 'M'],
    ['W', 'Q', 'N', 'J', 'F', 'M', 'L'],
]

fs.readFile(fileName, "UTF-8", (_, data) => {
    console.log(executeRearrangement(data.split('\r\n')));
})

function executeRearrangement(data) {
    data.forEach(command => {
        if (command.length) {
            const moves = parseCommand(command);
            if (moves.length === 3) {
                const cratesToMove = moves[0];
                const fromStack = moves[1];
                const toStack = moves[2];
    
                // moveCrates(cratesToMove, fromStack-1, toStack-1);
                moveCratesTogether(cratesToMove, fromStack-1, toStack-1);
            }
        }
    })
    return getFinalArrangement();
}

function parseCommand(command) {
    let commandsArray = [];
    command.split(' ').forEach(i => {
        if (isNumeric(i)) {
            commandsArray.push(i);
        }
    })
    return commandsArray;
}

function isNumeric(val) {
    return /^-?\d+$/.test(val);
}

function moveCrates(cratesToMove, fromStack, toStack) {
    if (stacks[fromStack].length < cratesToMove) return;
    for (let i = cratesToMove; i > 0; i--) {
        const crate = stacks[fromStack].pop()
        stacks[toStack].push(crate);
    }
}

function moveCratesTogether(cratesToMove, fromStack, toStack) {
    if (stacks[fromStack].length < cratesToMove) return;
    let crateStackToMove = [];
    for (let i = cratesToMove; i > 0; i--) {
        const crate = stacks[fromStack].pop()
        crateStackToMove.push(crate);
    }
    crateStackToMove.reverse().forEach(crate => {
        stacks[toStack].push(crate);
    })
}


function getFinalArrangement() {
    let finalArrangement = "";
    stacks.forEach(stack => {
        const crate = stack.at(stack.length-1);
        finalArrangement += crate;
    })
    return finalArrangement;
}