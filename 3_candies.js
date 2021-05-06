/*
PROBLEM:
--------

- There are N number of candies on the table
- There are two players lets say A and B
- Both players take turns on taking candies from the table
- A always goes first
- one player can only take  either 1, 2 or 5 candies from the table
- player who takes candy/candies the last, is the winner
- program should display the winner given the number of candies on the table
- assuming both players are playing optimally and want to win
- if the first player is winning, program should also display the first move the player took

UNDERSTANDING THE PROBLEM:
--------------------------
- a player can take either 1, 2, or 5 candies
- so at the end of round 1 (both players have taken their turn)
    - maximum number of candies taken can be only 7 (2+5)
    - for example: A takes 5, and B takes 2
- no player can make sure that max candies are taken after each round
    - for example: A takes 1, and B takes 5 (thats 6)
- but a player can make sure that either 6 or 3 candies at the end of each round
    - for example: A takes 1, and B takes 2 (thats 3)
    - example 2  : A takes 2, and B takes 1 (thats 3)
    - example 3  : A takes 1, and B takes 5 (thats 6)
    - example 4  : A takes 5, and B takes 5 (thats 6)
    - Here the player B is in control of what the total number of taken candies be after each round
    - either 3 or 6(which is a multiple of 3)
- so if player is always going first and the sequence of turns is as follows
    -e.g. A --> B --> A --> B --> A
- B is always controlling the total candies taken at the end of each round
- so if the N candies are a multiple of 3, B WINS easily!
- because just have to make sure that at the end of each round a total of 3 or 6 are taken
    OR
- whatever is leftover of the cookies, they are all taken, that's how B wins!

But How can Player A win if she is always going first????
Lets see:
- if N === 1   (A wins)
- if N === 2   (A wins)
- if N === 3   (B wins! because A can only take 1 or 2, depending on that B will take 2 or 1)
               (N is multiple of 3)
- if N === 4   (A can win if she takes only 1 candy at the start)

scenario-1) A takes 1, B takes 2, A takes 1 ==> A wins!

scenario-2) A takes 2, B takes 2            ==> B wins!

- So in scenario-1 A takes the extra candies after where multiple of 3 cuts off 4 % 3 === 1

- Lets try a bigger number that is not multiple of 3
  N = 11
  11 % 3 === 2

scenario-1) A takes 2, B takes 1, A takes 2, B takes 1, A takes 2, B takes 1, A takes 2   (A wins)
 (Here B is always making sure that total at the end of the round is 3 or 6)

lets not assume that B will always be bringing the total to 3 or 6

scenario-2) A takes 2, B takes 5, A takes 1, B takes 1, A takes 2   (A still wins);

So after picking the remainder as first value, A can continue to make sure that previous B take and current A take is equal to 3 or 6. Just like B does for winning.

what if A picks N % 6 (11 % 6 === 5)

scenario-3) A takes 5, B takes 1, (From this point A just needs to make sure that her pick and B's prev pick's total === 3 or === 6) A takes 2, B takes 1, A takes 2  (And A wins)

scenario-4) A takes 5, B takes 1, A takes 5 (A wins)

scenario-5) A takes 5, B takes 5, A takes 1  (A wins!)

scenario-6) A takes 5, B takes 2, A takes 1, B takes 1, A takes 2 (A wins)

A's victory is guaranteed, whether she picks 2 or 5 on first turn.
11 % 3 === 2, 11 % 6 === 5

for A her move becomes controlling move after she takes the remainder out in the first turn

A --> [B --> A] --> [B --> A] --> [B --> A] --> [B --> A]

First take the remainder out. Then control the total candies being taken at the end of each (imagined) round. Sort of imagine that it starts from B and end at A


ASSUMPTIONs:
-----------
- there can be more than one first moves, that will lead A to win
- in case of 11 candies, A can pick 2, or 5 as first move and win with both moves


*/

function pickWinner(n) {
  const firstMove = n % 3;
  if (n === 5) { firstMove = 5 }
  if (!firstMove) { return 'Player 2 wins!' }
  return `Player 1 wins. First Move: ${firstMove}`
}



// Above function can find out who the winner will be
// Below is an attempt to build the actual game and make the computer play it
// And log what each player does

const Player = {
  calcFirstMove: function(candies) {
    let x = candies % 3;

    if (this.moves.includes(candies)) {
      return candies;
    } else if (x) {
      return x;
    } else {
      // when player A has no chance of winning, she just picks 1
      x = 1;
    }

    return x;
  },

  calcMove: function(candies, otherPrevMove) {
    if (this.moves.includes(candies)) { return candies; }

    if (otherPrevMove === 1 && candies > 5) {
      return 5;
    } else if (otherPrevMove === 2 || otherPrevMove === 5) {
      return 1;
    } else {
      return 2;
    }
  },

  makeMove: function(candies, otherPrevMove) {
    if (this.firstPlayer && !this.firstMove) {
      this.firstMove = this.calcFirstMove(candies);
      this.prevMove = this.firstMove;
    } else {
      this.prevMove = this.calcMove(candies, otherPrevMove);
    }

    console.log(`Player_${this.name} takes ${this.prevMove} candies.`);
    return this.prevMove;
  },

  init: function(name) {
    this.name = name;
    this.firstMove;
    this.prevMove;
    this.firstPlayer = false;
    this.moves = [1, 2, 5];
    return this;
  }
};

const Game = {
  play: function(candies) {
    this.candiesLeft = candies;

    while (true) {
      this.candiesLeft -= this.player1.makeMove(this.candiesLeft, this.player2.prevMove);
      if (this.candiesLeft === 0) {
        console.log(`Player_${this.player1.name} has won! First move: ${this.player1.firstMove}`);
        break;
      }

      this.candiesLeft -= this.player2.makeMove(this.candiesLeft, this.player1.prevMove);

      if (this.candiesLeft === 0) {
        console.log(`Player_${this.player2.name} has won!`);
        break;
      }
    }
  },

  init: function(candies) {
    this.player1 = Object.create(Player).init('1');
    this.player2 = Object.create(Player).init('2');
    this.player1.firstPlayer = true;
    this.candiesLeft;
    this.play(candies);
  }
};

Game.init(11);