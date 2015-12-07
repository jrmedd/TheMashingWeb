var teamA, teamB;

function setup() {
  var gameArea = createCanvas(200, 300);
  gameArea.parent('game-area');
  noStroke();
  teamA = new mashingBar(0, height, width/2, height, 50, 128);
  teamB = new mashingBar(width/2, height, width, height, 50, 0);
};

function draw() {
  teamA.display();
  teamB.display();
};

$('button[name="A"]').on('click', function() {
  teamA.incrementHeight();
});

$('button[name="B"]').on('click', function() {
  teamB.incrementHeight();
});

function mashingBar(initX, initY, initWidth, initMax, initPresses, initColour) {
  rectMode(CORNERS);
  this.barcolour = initColour;
  this.xPos = initX;
  this.yPos = initY;
  this.barHeight = initY;
  this.barWidth = initWidth;
  this.heightMax = initMax;
  this.targetPresses = initPresses;
  this.pressSteps = this.heightMax/this.targetPresses;
  this.barColour = initColour;

  this.incrementHeight = function() {
    this.barHeight -= this.pressSteps;
    console.log(this.barHeight);
  };

  this.display = function() {
    push();
    fill(this.barColour);
    rect(this.xPos, this.yPos, this.barWidth, this.barHeight);
    pop();
  };
};
