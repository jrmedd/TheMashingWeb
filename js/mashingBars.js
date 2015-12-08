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
