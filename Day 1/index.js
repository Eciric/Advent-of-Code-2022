fs = require('fs');

const fileName = "data.txt";

function findMostCalories(data) {
    let mostCalories = 0, currentElfCalories = 0;
    let dataArray = data.split('\r\n');
    let caloriesPerElf = [];

    dataArray.forEach((item) => {
        if (item !== '') {
            currentElfCalories += Number(item);
        } else {
            if (currentElfCalories > mostCalories) {
                mostCalories = currentElfCalories;
            }
            caloriesPerElf.push(currentElfCalories);
            currentElfCalories = 0;
        }
    })
    caloriesPerElf.sort((a,b) => {return Number(b) - Number(a)});
    console.log(caloriesPerElf[0] + caloriesPerElf[1] + caloriesPerElf[2]);
    return mostCalories;
}

fs.readFile(fileName, 'utf8', (_,data) => {
    console.log(findMostCalories(data));
});

