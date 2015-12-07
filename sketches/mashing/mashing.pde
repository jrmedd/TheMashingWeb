mashingBar teamA;
mashingBar teamB;

boolean keyState;
boolean lastKeyState = false;
boolean mouseState;
boolean lastMouseState = false;

void setup() {
  size(200, 300);
  noStroke();  
  teamA = new mashingBar(0, height, width/2, height, 25, 255);
  teamB = new mashingBar(width/2, height, width, height, 25, 0);
};

void draw() {
  background(128);
  teamA.display();
  teamB.display();
  keyState = keyPressed;
  mouseState = mousePressed;
  if (keyPressed != lastKeyState) {
    if (keyPressed) {
      teamA.incrementHeight();
    };
  };
  if (teamA.barHeight < 0) {
    teamA.barHeight = height;
  };
  if (mouseState != lastMouseState) {
    if (mouseState) {
      teamB.incrementHeight();
    };
  };
  if (teamB.barHeight < 0) {
    teamB.barHeight = height;
  };
  lastKeyState = keyState;
  lastMouseState = mouseState;
};

class mashingBar {
  int xPos;
  int yPos;
  int barWidth;
  int barHeight;
  int heightMax;
  int barColour;
  float targetPresses;

  mashingBar(int initX, int initY, int initWidth, int initMax, int initPresses, int initColour) {
    rectMode(CORNERS);
    barColour = initColour;
    xPos = initX;
    yPos = initY;
    barHeight = initY;
    barWidth = initWidth;
    heightMax = initMax;
    targetPresses = heightMax/initPresses;
    barColour = initColour;
  };

  void incrementHeight() {
    barHeight -= targetPresses;
  };

  void display() {
    pushStyle();
    fill(barColour);
    rect(xPos, yPos, barWidth, barHeight);
    popStyle();
  };
};