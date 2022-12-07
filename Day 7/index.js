fs = require('fs');

const fileName = './data.txt';

const fileSystem = {
    root: {
        parent: null,
        name: '/',
        fileSize: 0,
        directory: true,
        children: [],
    }
}

let fileSystemPointer = fileSystem.root;

let directoriesMatchingCriteria = [];

const maxDiskSpace = 70000000;

const spaceNecessaryForUpdate = 30000000;

let allDirectoriesSizes = [];

fs.readFile(fileName, 'UTF-8', (_, data) => {
    parseLineData(data.split('\r\n'));
    const rootSize = findDirectorySizes(fileSystem.root);
    // console.log(directoriesMatchingCriteria.reduce((a, b) => {return a+b}, 0));
    console.log(findTheSmallestDeletableDirectory(rootSize));
})

function parseLineData(data) {
    data.forEach(line => {
        if (line.length) {
            handleCommands(line);
        }
    })
}

function handleCommands(line) {
    const lineArray = line.split(' ');
    switch(lineArray[0]) {
        case '$': 
            if (lineArray[1] === 'cd') {
                changeDirectory(lineArray[2]);
            } 
            break;
        case 'dir':
            addDir(lineArray[1]);
            break;
        default:
            addFile(lineArray[0], lineArray[1]);
        }
}

function changeDirectory(directoryName) {
    if (directoryName === '..') {
        if (fileSystemPointer.parent) fileSystemPointer = fileSystemPointer.parent
    }
    else if (directoryName === '/') {
        fileSystemPointer = fileSystem.root;
    }
    else {
        for (let i = 0; i < fileSystemPointer.children.length; i++) {
            const child = fileSystemPointer.children[i];
            if (child.name === directoryName) {
                fileSystemPointer = child;
                break;
            }
        }
    }
}

function addDir(dirName) {
    const newDirectory = {
        parent: fileSystemPointer,
        name: dirName,
        fileSize: 0,
        directory: true,
        children: [],
    }
    fileSystemPointer.children.push(newDirectory);
}

function addFile(fileSize, fileName) {
    const newFile = {
        parent: fileSystemPointer,
        name: fileName,
        fileSize: Number(fileSize),
        directory: false,
        children: [],
    }
    fileSystemPointer.children.push(newFile);
}

function findDirectorySizes(directory) {
    let fileSizeSum = 0;
    for (let i = 0; i < directory.children.length; i++) {
        const child = directory.children[i];
        if (child.directory === true) {
            fileSizeSum += findDirectorySizes(child);
        } else {
            fileSizeSum += child.fileSize;
        }
    }
    if (fileSizeSum < 100000 && fileSizeSum > 0) {
        directoriesMatchingCriteria.push(fileSizeSum);
    }
    allDirectoriesSizes.push(fileSizeSum);
    return fileSizeSum;
}

function findTheSmallestDeletableDirectory(rootSize) {
    const amountOfSpaceToFreeUp = (rootSize + spaceNecessaryForUpdate) - maxDiskSpace;
    let currentBestDirectory = Number.POSITIVE_INFINITY;
    for (let i = 0; i < allDirectoriesSizes.length; i++) {
        if (allDirectoriesSizes[i] > amountOfSpaceToFreeUp && allDirectoriesSizes[i] < currentBestDirectory) {
            currentBestDirectory = allDirectoriesSizes[i];
        }
    }
    return currentBestDirectory;
}