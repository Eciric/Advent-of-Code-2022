fs = require("fs");

const fileName = "./data.txt";

const MAX_ARRAY_SIZE = 1000;

const arrayIndicators = {
  head: {
    x: MAX_ARRAY_SIZE / 2,
    y: MAX_ARRAY_SIZE / 2,
  },
  tail: {
    x: MAX_ARRAY_SIZE / 2,
    y: MAX_ARRAY_SIZE / 2,
  },
};

const nodesVisitedByTail = [[MAX_ARRAY_SIZE / 2, MAX_ARRAY_SIZE / 2]];

fs.readFile(fileName, "UTF-8", (_, data) => {
  traverseTheArray(data.split("\r\n"));
  console.log(nodesVisitedByTail);
  console.log(nodesVisitedByTail.length);
});

function traverseTheArray(data) {
  data.forEach((command) => {
    const [direction, steps] = command.split(" ");
    switch (direction) {
      case "U":
        traverseUp(steps);
        break;
      case "D":
        traverseDown(steps);
        break;
      case "L":
        traverseLeft(steps);
        break;
      case "R":
        traverseRight(steps);
        break;
    }
  });
}

function updateTail() {
  // Updates the tail diagonally
  if (
    arrayIndicators.head.x !== arrayIndicators.tail.x &&
    arrayIndicators.head.y !== arrayIndicators.tail.y
  ) {
    if (
      (Math.abs(arrayIndicators.head.x - arrayIndicators.tail.x) > 1 &&
        Math.abs(arrayIndicators.head.y - arrayIndicators.tail.y) >= 1) ||
      (Math.abs(arrayIndicators.head.y - arrayIndicators.tail.y) > 1 &&
        Math.abs(arrayIndicators.head.x - arrayIndicators.tail.x) >= 1)
    ) {
      if (arrayIndicators.head.x > arrayIndicators.tail.x) {
        arrayIndicators.tail.x++;
      } else {
        arrayIndicators.tail.x--;
      }
      if (arrayIndicators.head.y > arrayIndicators.tail.y) {
        arrayIndicators.tail.y++;
      } else {
        arrayIndicators.tail.y--;
      }
      appendToNodes();
    }
  }

  // Updates the tail vertically
  if (arrayIndicators.head.x !== arrayIndicators.tail.x) {
    if (Math.abs(arrayIndicators.head.x - arrayIndicators.tail.x) > 1) {
      if (arrayIndicators.head.x > arrayIndicators.tail.x) {
        arrayIndicators.tail.x++;
      } else {
        arrayIndicators.tail.x--;
      }
      appendToNodes();
    }
  }

  // Updates the tail horizontally
  if (arrayIndicators.head.y !== arrayIndicators.tail.y) {
    if (Math.abs(arrayIndicators.head.y - arrayIndicators.tail.y) > 1) {
      if (arrayIndicators.head.y > arrayIndicators.tail.y) {
        arrayIndicators.tail.y++;
      } else {
        arrayIndicators.tail.y--;
      }
      appendToNodes();
    }
  }
}

function traverseUp(steps) {
  for (let i = steps; i > 0; i--) {
    if (arrayIndicators.head.x > 0) {
      arrayIndicators.head.x--;
      updateTail();
    }
  }
}

function traverseDown(steps) {
  for (let i = steps; i > 0; i--) {
    if (arrayIndicators.head.x < MAX_ARRAY_SIZE) {
      arrayIndicators.head.x++;
      updateTail();
    }
  }
}

function traverseLeft(steps) {
  for (let i = steps; i > 0; i--) {
    if (arrayIndicators.head.y > 0) {
      arrayIndicators.head.y--;
      updateTail();
    }
  }
}

function traverseRight(steps) {
  for (let i = steps; i > 0; i--) {
    if (arrayIndicators.head.y < MAX_ARRAY_SIZE) {
      arrayIndicators.head.y++;
      updateTail();
    }
  }
}

function appendToNodes() {
  let includes = false;
  for (let i = 0; i < nodesVisitedByTail.length; i++) {
    if (
      nodesVisitedByTail[i][0] === arrayIndicators.tail.x &&
      nodesVisitedByTail[i][1] === arrayIndicators.tail.y
    ) {
      includes = true;
      break;
    }
  }

  if (!includes) {
    nodesVisitedByTail.push([arrayIndicators.tail.x, arrayIndicators.tail.y]);
  }
}
