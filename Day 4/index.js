fs = require('fs');

const fileName = './data.txt';

fs.readFile(fileName, 'UTF-8', (_, data) => {
    console.log(countFullContainments(data.split('\r\n')));
    console.log(countOverlaps(data.split('\r\n')));
})

function countFullContainments(data) {
    let sumOfFullContainments = 0;
    data.forEach(row => {
        if (row.length) {
            const [leftRange, rightRange] = row.split(',');
         
            const isFullyContained = checkFullContainment(leftRange, rightRange);
            sumOfFullContainments += isFullyContained;
        }
    }) 
    return sumOfFullContainments;
}

function checkFullContainment(leftRange, rightRange) {
    const leftBoundaries = leftRange.split('-');
    const rightBoundaries = rightRange.split('-');

    if (leftBoundaries.length === 2 && rightBoundaries.length === 2) {
        // Left is fully contained within the right
        if (Number(leftBoundaries[0]) >= Number(rightBoundaries[0]) && Number(leftBoundaries[1]) <= Number(rightBoundaries[1])) {
            return 1;
        }

        // Right is fully contained within the left
        if (Number(rightBoundaries[0]) >= Number(leftBoundaries[0]) && Number(rightBoundaries[1]) <= Number(leftBoundaries[1])) {
            return 1;
        }
    }

    return 0;
}

function countOverlaps(data) {
    let sumOfOverlaps = 0;
    data.forEach(row => {
        if (row.length) {
            const [leftRange, rightRange] = row.split(',');
         
            const isOverlapping = checkOverlap(leftRange, rightRange);
            sumOfOverlaps += isOverlapping;
        }
    }) 
    return sumOfOverlaps;
}

function checkOverlap(leftRange, rightRange) {
    const leftBoundaries = leftRange.split('-');
    const rightBoundaries = rightRange.split('-');

    if (leftBoundaries.length === 2 && rightBoundaries.length === 2) {
        // Lower boundary of right range overlaps with left range
        if (Number(rightBoundaries[0]) >= Number(leftBoundaries[0]) && Number(rightBoundaries[0]) <= Number(leftBoundaries[1])) {
            return 1;
        }

        // Upper boundary of right range overlaps with left range
        if (Number(rightBoundaries[1]) >= Number(leftBoundaries[0]) && Number(rightBoundaries[1]) <= Number(leftBoundaries[1])) {
            return 1;
        }

        // Lower boundary of left range overlaps with right range
        if (Number(leftBoundaries[0]) >= Number(rightBoundaries[0]) && Number(leftBoundaries[0]) <= Number(rightBoundaries[1])) {
            return 1;
        }
        
        // Upper boundary of left range overlaps with right range
        if (Number(leftBoundaries[1]) >= Number(rightBoundaries[0]) && Number(leftBoundaries[1]) <= Number(rightBoundaries[1])) {
            return 1;
        }
    }

    return 0;
}