var teamA, teamB;
var alertOverlay;
var pressesToWin = 10;

/*p5.js setup*/
function setup() {
  var gameArea = createCanvas(250, 500);
  gameArea.parent('game-area');
  noStroke();
  teamA = new mashingBar(0, height, width/2, height, pressesToWin, color(254,239,110));
  teamB = new mashingBar(width/2, height, width, height, pressesToWin, color(255,53,197));
  alertOverlay = new gameText(width/2, height/2, 48);
  textFont('Bangers');
};

/*p5.js loop*/
function draw() {
  background(255);
  teamA.display();
  teamB.display();
  alertOverlay.display();
};

/*team A mashes*/
$('button[name="A"]').on('click', function() {
  teamA.incrementHeight();
  if (teamA.stepsPressed > pressesToWin) {
    gameWin("A")
  };
});

/*team B mashes*/
$('button[name="B"]').on('click', function() {
  teamB.incrementHeight();
  if (teamB.stepsPressed > pressesToWin) {
    gameWin("B")
  };
});

/*text overlays*/
function gameText(initX, initY, initSize) {
  this.xPos = initX;
  this.yPos = initY;
  this.textToDisplay = "";
  this.textOpacity = 0;
  this.fadeOut = false;
  textAlign(CENTER);
  textSize(initSize);

  /*display text*/
  this.display = function(){
    push();
    this.fadeOutState(); //check fadeout state and reduce opacity
    fill(color(0, this.textOpacity));
    text(this.textToDisplay, this.xPos, this.yPos);
    pop();
  };

  /*flash winning team*/
  this.flashText = function(textToFlash) {
    this.textToDisplay = textToFlash; //winning team text
    this.textOpacity = 255; //max out opacity
    this.fadeOut = true; //set to fade out
    this.fadeOutRate = 2.5; //set fadeout rate
  };

  /*function for checking fadeout state, and to reduce opacity*/
  this.fadeOutState = function(){
    if (this.fadeOut){
      this.textOpacity -= this.fadeOutRate;
      if (this.textOpacity <= 0) {
        this.fadeOut = false;
      };
    };
  };
};

/*mashing bars*/
function mashingBar(initX, initY, initWidth, initTotal, initPresses, initColour) {
  rectMode(CORNERS);
  this.stepsPressed = 0;
  this.barcolour = initColour;
  this.xPos = initX;
  this.yPos = initY;
  this.barHeight = initY;
  this.barWidth = initWidth;
  this.totalHeight = initTotal;
  this.targetPresses = initPresses;
  this.pressSteps = this.totalHeight/this.targetPresses;
  this.barColour = initColour;

  /* increase bar height and log number of steps pressed*/
  this.incrementHeight = function() {
    this.barHeight -= this.pressSteps;
    this.stepsPressed += 1;
  };

  /*reset bar height and number of steps pressed*/
  this.resetHeight = function() {
    this.barHeight = this.totalHeight;
    this.stepsPressed = 0;
  };

  /*display bar */
  this.display = function() {
    push();
    fill(this.barColour);
    rect(this.xPos, this.yPos, this.barWidth, this.barHeight);
    pop();
  };
};

/*trigger win state*/
function gameWin(team) {
  var winningMessage = "Team " + team + " wins!";
  alertOverlay.flashText(winningMessage);
  teamA.resetHeight();
  teamB.resetHeight();
}
