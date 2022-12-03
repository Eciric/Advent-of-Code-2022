fs = require('fs');

const fileName = "./data.txt";

const lowerCaseValues = {}, upperCaseValues = {};

let firstElfItems = {}, secondElfItems = {}, thirdElfItems = {};

const initializeCaseValues = () => {
    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
        lowerCaseValues[String.fromCharCode(i)] = i - ('a'.charCodeAt(0) - 1);
    }

    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        upperCaseValues[String.fromCharCode(i)] = i - ('A'.charCodeAt(0) - 27);
    }
}

const getCharacterValue = (character) => {
    return String(character).toUpperCase() === character ? upperCaseValues[character] : lowerCaseValues[character];
}

const findMatchingChar = (leftString, rightString) => {
    const leftStringChars = leftString.split('');
    for (let i = 0; i < leftStringChars.length; i++) {
        if (rightString.includes(leftStringChars[i])) {
            return leftStringChars[i];
        }
    }
    return null;
}

const getSumOfPriorities = (data) => {
    const dataArray = data.split('\r\n');
    let sum = 0;

    dataArray.forEach((line) => {
        if (line.length) {
            const leftCompartment = line.slice(0, line.length / 2);
            const rightCompartment = line.slice(line.length / 2, line.length);
            let matchingCharacter = findMatchingChar(leftCompartment, rightCompartment);
            sum += getCharacterValue(matchingCharacter);
        }
    })
    return sum;
}

const assignElfItems = (firstElf, secondElf, thirdElf) => {
    firstElfItems = [...firstElf].reduce((object, character) => { 
        object[character] = object[character] ? object[character] + 1 : 1; 
        return object;
    }, {});

    secondElfItems = [...secondElf].reduce((object, character) => { 
        object[character] = object[character] ? object[character] + 1 : 1; 
        return object;
    }, {});

    thirdElfItems = [...thirdElf].reduce((object, character) => { 
        object[character] = object[character] ? object[character] + 1 : 1; 
        return object;
    }, {});
}

const findTeamBadge = (firstElf, secondElf, thirdElf) => {
    assignElfItems(firstElf, secondElf, thirdElf);

    const possibleBadges = [];
    for (let item in firstElfItems) {
        if (secondElfItems[item]) {
            possibleBadges.push(item);
        }
    }
    for (let i = 0; i < possibleBadges.length; i++) {
        let badge = possibleBadges[i];
        if (thirdElfItems[badge]) {
            return badge;
        }
    }
    return null;
}

const getSumOfTeamPriorities = (data) => {
    const dataArray = data.split('\r\n');
    let sum = 0;

    for (let i = 0; i < dataArray.length - 1; i+=3) {
        const firstElf = dataArray[i], secondElf = dataArray[i + 1], thirdElf = dataArray[i + 2];

        const teamBadge = findTeamBadge(firstElf, secondElf, thirdElf);
        sum += getCharacterValue(teamBadge);
    }

    return sum;
}

fs.readFile(fileName, 'UTF-8', (_, data) => {
    initializeCaseValues();
    // console.log('sum: ' + getSumOfPriorities(data));
    console.log(getSumOfTeamPriorities(data));
})
