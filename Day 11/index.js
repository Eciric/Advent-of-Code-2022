fs = require("fs");

const fileName = "./data.txt";

const allMonkeys = [];

fs.readFile(fileName, "UTF-8", (_, data) => {
    parseRawDataIntoObjects(data.split("\r\n"));
    startRounds();
    console.log(allMonkeys);
    console.log(
        ([first, second] = allMonkeys
            .map((monke) => monke.inspected)
            .sort((a, b) => a - b)
            .reverse()),
        first * second
    );
});

function parseRawDataIntoObjects(data) {
    let newMonkey = {
        items: [],
        operation: [],
        test: 0,
        true: 0,
        false: 0,
        inspected: 0,
    };
    data.forEach((line) => {
        if (!line.length) {
            allMonkeys.push(newMonkey);
            newMonkey = {
                items: [],
                operation: [],
                test: 0,
                true: 0,
                false: 0,
                inspected: 0,
            };
        } else {
            const lineArray = line.trim().split(" ");
            if (lineArray[1] === "items:") {
                const items = line.split(":")[1].trim().split(" ");
                for (let i = 0; i < items.length; i++) {
                    newMonkey.items.push(items[i].trim().replace(/,/g, ""));
                }
            }
            if (lineArray[0] === "Operation:") {
                if (lineArray.length === 6) {
                    newMonkey.operation = [
                        lineArray[3],
                        lineArray[4],
                        lineArray[5],
                    ];
                }
            }
            if (lineArray[0] === "Test:") {
                newMonkey.test = lineArray[3];
            }
            if (lineArray[1] === "true:") {
                newMonkey.true = lineArray[5];
            }
            if (lineArray[1] === "false:") {
                newMonkey.false = lineArray[5];
            }
        }
    });
}

function startRounds() {
    const modulus = allMonkeys
        .map((monke) => monke.test)
        .reduce((a, b) => a * b, 1);

    for (let i = 0; i < 10000; i++) {
        allMonkeys.forEach((monke) => {
            const tempMonkeItems = [...monke.items];
            for (let j = 0; j < tempMonkeItems.length; j++) {
                monke.inspected++;

                let itemTotalWorryLevel = getOperationWorryLevel(
                    monke.operation,
                    Number(tempMonkeItems[j])
                );

                itemTotalWorryLevel %= modulus;

                if (itemTotalWorryLevel % monke.test) {
                    const indexToRemove = monke.items.indexOf(
                        tempMonkeItems[j]
                    );
                    monke.items.splice(indexToRemove, 1);
                    allMonkeys[monke.false].items.push(itemTotalWorryLevel);
                } else {
                    const indexToRemove = monke.items.indexOf(
                        tempMonkeItems[j]
                    );
                    monke.items.splice(indexToRemove, 1);
                    allMonkeys[monke.true].items.push(itemTotalWorryLevel);
                }
            }
        });
    }
}

function getOperationWorryLevel(operationArray, item) {
    if (operationArray.length !== 3) return null;

    if (operationArray[1] === "+") {
        if (operationArray[2] === "old") return item + item;
        else return item + Number(operationArray[2]);
    }
    if (operationArray[1] === "*") {
        if (operationArray[2] === "old") return item * item;
        else return item * Number(operationArray[2]);
    }

    return null;
}
