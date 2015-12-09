/*mashing bars*/
function mashingBar(initX, initY, initWidth, initTotalHeight, initPresses, initColour) {
  rectMode(CORNERS);
  this.stepsPressed = 0;
  this.barHeight = 0;
  this.barcolour = initColour;
  this.xPos = initX;
  this.yPos = initY;
  this.barWidth = initWidth;
  this.targetPresses = initPresses;
  this.totalHeight = initTotalHeight;
  this.pressSteps = this.totalHeight/this.targetPresses;
  this.barColour = initColour;

  /* increase bar height and log number of steps pressed*/
  this.incrementHeight = function() {
    this.barHeight -= this.pressSteps;
    this.stepsPressed += 1;
  };

  /*reset bar height and number of steps pressed*/
  this.resetHeight = function() {
    this.barHeight = 0;
    this.stepsPressed = 0;
  };

  /*display bar */
  this.display = function() {
    push();
    translate(this.xPos, this.yPos);
    fill(this.barColour);
    rect(0, 0, this.barWidth, this.barHeight);
    pop();
  };
};
