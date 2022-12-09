fs = require("fs");

const fileName = "./data.txt";

const MAX_ARRAY_SIZE = 1000;

const arrayIndicators = {
  head: {
    x: MAX_ARRAY_SIZE / 2,
    y: MAX_ARRAY_SIZE / 2,
  },
  tail: [
    {
      x: MAX_ARRAY_SIZE / 2,
      y: MAX_ARRAY_SIZE / 2,
    },
    {
      x: MAX_ARRAY_SIZE / 2,
      y: MAX_ARRAY_SIZE / 2,
    },
    {
      x: MAX_ARRAY_SIZE / 2,
      y: MAX_ARRAY_SIZE / 2,
    },
    {
      x: MAX_ARRAY_SIZE / 2,
      y: MAX_ARRAY_SIZE / 2,
    },
    {
      x: MAX_ARRAY_SIZE / 2,
      y: MAX_ARRAY_SIZE / 2,
    },
    {
      x: MAX_ARRAY_SIZE / 2,
      y: MAX_ARRAY_SIZE / 2,
    },
    {
      x: MAX_ARRAY_SIZE / 2,
      y: MAX_ARRAY_SIZE / 2,
    },
    {
      x: MAX_ARRAY_SIZE / 2,
      y: MAX_ARRAY_SIZE / 2,
    },
    {
      x: MAX_ARRAY_SIZE / 2,
      y: MAX_ARRAY_SIZE / 2,
    },
  ],
};

const nodesVisitedByTail = [[500, 500]];

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
    arrayIndicators.head.x !== arrayIndicators.tail[0].x &&
    arrayIndicators.head.y !== arrayIndicators.tail[0].y
  ) {
    if (
      (Math.abs(arrayIndicators.head.x - arrayIndicators.tail[0].x) > 1 &&
        Math.abs(arrayIndicators.head.y - arrayIndicators.tail[0].y) >= 1) ||
      (Math.abs(arrayIndicators.head.y - arrayIndicators.tail[0].y) > 1 &&
        Math.abs(arrayIndicators.head.x - arrayIndicators.tail[0].x) >= 1)
    ) {
      if (arrayIndicators.head.x > arrayIndicators.tail[0].x) {
        arrayIndicators.tail[0].x++;
      } else {
        arrayIndicators.tail[0].x--;
      }
      if (arrayIndicators.head.y > arrayIndicators.tail[0].y) {
        arrayIndicators.tail[0].y++;
      } else {
        arrayIndicators.tail[0].y--;
      }
    }
  }

  // Updates the tail vertically
  if (arrayIndicators.head.x !== arrayIndicators.tail[0].x) {
    if (Math.abs(arrayIndicators.head.x - arrayIndicators.tail[0].x) > 1) {
      if (arrayIndicators.head.x > arrayIndicators.tail[0].x) {
        arrayIndicators.tail[0].x++;
      } else {
        arrayIndicators.tail[0].x--;
      }
    }
  }

  // Updates the tail horizontally
  if (arrayIndicators.head.y !== arrayIndicators.tail[0].y) {
    if (Math.abs(arrayIndicators.head.y - arrayIndicators.tail[0].y) > 1) {
      if (arrayIndicators.head.y > arrayIndicators.tail[0].y) {
        arrayIndicators.tail[0].y++;
      } else {
        arrayIndicators.tail[0].y--;
      }
    }
  }

  for (let i = 0; i < arrayIndicators.tail.length - 1; i++) {
    // Updates the tail diagonally
    if (
      arrayIndicators.tail[i].x !== arrayIndicators.tail[i + 1].x &&
      arrayIndicators.tail[i].y !== arrayIndicators.tail[i + 1].y
    ) {
      if (
        (Math.abs(arrayIndicators.tail[i].x - arrayIndicators.tail[i + 1].x) >
          1 &&
          Math.abs(arrayIndicators.tail[i].y - arrayIndicators.tail[i + 1].y) >=
            1) ||
        (Math.abs(arrayIndicators.tail[i].y - arrayIndicators.tail[i + 1].y) >
          1 &&
          Math.abs(arrayIndicators.tail[i].x - arrayIndicators.tail[i + 1].x) >=
            1)
      ) {
        if (arrayIndicators.tail[i].x > arrayIndicators.tail[i + 1].x) {
          arrayIndicators.tail[i + 1].x++;
        } else {
          arrayIndicators.tail[i + 1].x--;
        }
        if (arrayIndicators.tail[i].y > arrayIndicators.tail[i + 1].y) {
          arrayIndicators.tail[i + 1].y++;
        } else {
          arrayIndicators.tail[i + 1].y--;
        }
        //Only append to nodes if last tail moved
        if (i + 1 === arrayIndicators.tail.length - 1) appendToNodes();
      }
    }

    // Updates the tail vertically
    if (arrayIndicators.tail[i].x !== arrayIndicators.tail[i + 1].x) {
      if (
        Math.abs(arrayIndicators.tail[i].x - arrayIndicators.tail[i + 1].x) > 1
      ) {
        if (arrayIndicators.tail[i].x > arrayIndicators.tail[i + 1].x) {
          arrayIndicators.tail[i + 1].x++;
        } else {
          arrayIndicators.tail[i + 1].x--;
        }
        //Only append to nodes if last tail moved
        if (i + 1 === arrayIndicators.tail.length - 1) appendToNodes();
      }
    }

    // Updates the tail horizontally
    if (arrayIndicators.tail[i].y !== arrayIndicators.tail[i + 1].y) {
      if (
        Math.abs(arrayIndicators.tail[i].y - arrayIndicators.tail[i + 1].y) > 1
      ) {
        if (arrayIndicators.tail[i].y > arrayIndicators.tail[i + 1].y) {
          arrayIndicators.tail[i + 1].y++;
        } else {
          arrayIndicators.tail[i + 1].y--;
        }
        //Only append to nodes if last tail moved
        if (i + 1 === arrayIndicators.tail.length - 1) appendToNodes();
      }
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
  const lastTailIndex = arrayIndicators.tail.length - 1;
  if (
    !includes([
      arrayIndicators.tail[lastTailIndex].x,
      arrayIndicators.tail[lastTailIndex].y,
    ])
  ) {
    nodesVisitedByTail.push([
      arrayIndicators.tail[lastTailIndex].x,
      arrayIndicators.tail[lastTailIndex].y,
    ]);
  }
}

function includes(array) {
  for (let i = 0; i < nodesVisitedByTail.length; i++) {
    if (
      nodesVisitedByTail[i][0] === array[0] &&
      nodesVisitedByTail[i][1] === array[1]
    )
      return true;
  }
  return false;
}
