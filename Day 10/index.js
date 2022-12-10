fs = require("fs");

const fileName = "./data.txt";

let commandExecutable = {
    commandType: "",
    value: 0,
    cycle: 0,
};

let registerX = 1;

let globalCycle = 0;

const signalStrengths = [];

const screenRender = [];

const keyCycles = [20, 60, 100, 140, 180, 220];

fs.readFile(fileName, "UTF-8", (_, data) => {
    findSixSignalStrengths(data.split("\r\n"));
    console.log(
        signalStrengths,
        signalStrengths.reduce((a, b) => {
            return a + b;
        }, 0)
    );
    screenRender.forEach((row) => {
        let pixelRow = "";
        row.forEach((pixel) => (pixelRow += pixel));
        console.log(pixelRow);
    });
});

function findSixSignalStrengths(data) {
    let index = 0;
    let row = [];
    let drawingPixelIndex = 1;
    let rowLimits = [40, 80, 120, 160, 200, 240];
    while (true) {
        if (data[index] === "") break;
        globalCycle++;

        if (keyCycles.includes(globalCycle)) {
            signalStrengths.push(globalCycle * registerX);
        }

        const [command, value] = data[index].split(" ");

        if (!commandExecutable.commandType.length) {
            commandExecutable.commandType = command;
            commandExecutable.value = value ? Number(value) : 0;
            commandExecutable.cycle = 1;
        }

        switch (commandExecutable.commandType) {
            case "noop":
                commandExecutable.commandType = "";
                index++;
                break;

            case "addx":
                if (commandExecutable.cycle === 1) {
                    commandExecutable.cycle++;
                } else {
                    registerX += commandExecutable.value;
                    commandExecutable.commandType = "";
                    index++;
                }
                break;
        }
        if (
            registerX - 1 === drawingPixelIndex ||
            registerX === drawingPixelIndex ||
            registerX + 1 === drawingPixelIndex
        ) {
            row.push("#");
        } else {
            row.push(".");
        }
        drawingPixelIndex++;
        if (rowLimits.includes(globalCycle)) {
            let rowLimitIndex = rowLimits.indexOf(globalCycle);
            rowLimits.splice(rowLimitIndex, 1);
            screenRender.push(row);
            row = [];
            drawingPixelIndex = 1;
        }
    }
}
