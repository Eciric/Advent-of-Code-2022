fs = require('fs');

const fileName = './data.txt';

fs.readFile(fileName, 'UTF-8', (_, data) => {
    console.log(findPacket(data, 4));
    console.log(findPacket(data, 14));
})

function findPacket(data, packetLength) {
    for (let i = 0; i <= data.length-packetLength; i++) {
        let flag = true;
        let letters = [];
        for (let j = i; j < i + packetLength; j++) {
            if (!letters.includes(data[j])) {
                letters.push(data[j]);
            } else {
                flag = false;
                break;
            }
        }
        if (flag) {
            return [letters, i+packetLength];
        }
    }

    return null;
}
