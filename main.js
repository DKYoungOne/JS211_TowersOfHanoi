'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};


// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  let start = stacks[startStack];
  let end = stacks[endStack];
  let startPiece = start.at(-1);
  let endPiece = end.at(-1);
  console.log('Start' + startPiece);
  console.log('End' + endPiece);

// Logic to determine if the move is legal using the number values of the "blocks" in the stacks object
  if (stacks[endStack].length == 0) {
    return true;
  } else if (start.at(-1) < end.at(-1)) {
    return true;
  } else {
    console.log(start + 'is not less than' + end);
    return false;
  }
  
}
// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  // Logic to check if the move is legal BEFORE moving the piece to the new area, this logic works for tests, but will have to altered a little bit to fit
  // with the gui and html, potentially may need to split this function into to separate functions with a global variable to keep the information in the global scope.
  if (isLegal(startStack, endStack)) {
    let movedPiece = stacks[startStack].pop();
    stacks[endStack].push(movedPiece);
  }
}



// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  
  // Step one: make sure the win condition is working.
  if (stacks.c.length == 4) {
    console.log("You won!");
    return true;
  } else {return false;}
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  //Whenever towersOfHanoi() is called, move the piece first (which already checks for legal moves) and then check for a win.
  movePiece(startStack, endStack);
  checkForWin();

}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
    //added test 1
    it('should allow a legal move', () => {
      stacks = {
        a: [],
        b: [1],
        c: [4, 3, 2]
      };
      assert.equal(isLegal('b', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
