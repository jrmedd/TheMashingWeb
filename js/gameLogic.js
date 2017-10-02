chrome.app.window.current().fullscreen();
var debugMode = false;

var gameActive = false;
var teamA, teamB, teamAAudio, teamBAudio, teamALabel, teamBLabel;
var introPip;
var pressesToWin = 150; //presses required to win game (increase based on team sizes)
var frequencyIncrement = 7;
var alertOverlay;
var teamAVoiceFreq = 440; //starting frequency of team's audio synth
var teamBVoiceFreq = 220; //starting frequency of team's audio synth
var buttonsDisabled = true;
var startButton;
var lastStartButton = 0;
var buttonStates;
var lastStates = [];
for (var state = 0; state < 10; state ++){
  lastStates[state] = 0;
};
var connectionId = -1;
var gameStartText;
var startTextBlink;

var debugFrameRate;

/*p5.js setup*/
function setup() {
  if ($(window).width() > $(window).height()) {
    var gameWidth = $(window).height()*0.75;
    var gameHeight= $(window).height()*0.75;
  }
  else {
    var gameWidth = $(window).width()*0.75;
    var gameHeight= $(window).width()*0.75;
  }
  var gameArea = createCanvas(gameWidth, gameHeight);
  gameArea.parent('game-area');
  frameRate(30); //limting frameRate increases performance on Raspberry Pi 2
  noStroke();
  teamA = new mashingBar(0, height, width/2, height, pressesToWin, color(255,53,197));
  teamB = new mashingBar(width/2, height, width/2, height, pressesToWin, color(102, 211, 232));
  teamAAudio = new simpleSynth(teamAVoiceFreq, 2, 2);
  teamBAudio = new simpleSynth(teamBVoiceFreq, 1.5, 1.75);
  teamALabel = new gameText(width*0.25, height*0.99, 22);
  teamALabel.textToDisplay = "Team A";
  teamBLabel = new gameText(width*0.75, height*0.99, 22);
  teamBLabel.textToDisplay = "Team B";
  introPip = new simpleSynth(360, 1, 0);
  alertOverlay = new gameText(width/2, height/2, 56);
  alertOverlay.textOpacity = 0;
  gameStartText = new gameText(width/2, height/2, 62);
  gameStartText.textToDisplay = "Push Start";
  startTextBlink = millis();
  textFont('Upheaval');
  debugFrameRate = new gameText(width*0.5, height*0.1, 18);
  chrome.serial.getDevices(onGetDevices);
};

/*p5.js loop*/
function draw() {
  background(0);
  teamA.display();
  teamB.display();
  alertOverlay.display();
  /*Check start button state (Arduino connected, game not active)*/
  if (connectionId > 0 && !gameActive) {
    if (startButton != lastStartButton) {
      lastStartButton = startButton;
      if (startButton == 1) {
        startGame();
      };
    };
  };
  /*Check button states, display team labels (Arduino connected, buttons enabled)*/
  if (connectionId > 0 && !buttonsDisabled) {
    teamALabel.display();
    teamBLabel.display();
    /*iterate over buttonStates from gameController.js*/
    $.each(buttonStates, function(index, value){
      var currentState = value;
      var lastState = lastStates[index];
      if (currentState != lastState) {
        if (currentState == 1) {
          if (index >= buttonStates.length/2) {
            teamB.incrementHeight();
            teamBVoiceFreq += frequencyIncrement;
            teamBAudio.simpleEnv(audioCtx.currentTime, teamBVoiceFreq, 25, 50);
            if (teamB.stepsPressed > pressesToWin) {
              gameWin("B")
              return false;
            };
          }
          else {
            teamA.incrementHeight();
            teamAVoiceFreq += frequencyIncrement;
            teamAAudio.simpleEnv(audioCtx.currentTime, teamAVoiceFreq, 25, 50);
            if (teamA.stepsPressed > pressesToWin) {
              gameWin("A")
              return false;
            };
          };
        };
      };
      lastStates[index] = currentState;
    });
  };
  /*Display blinking game start text (game not active, alert text no longer visible)*/
  if (!gameActive && alertOverlay.textOpacity < 1) {
    var blinkNow = millis();
    if ((blinkNow - startTextBlink) > 750.) {
      gameStartText.textOpacity = abs(gameStartText.textOpacity - 255)
      startTextBlink = blinkNow;
    }
    gameStartText.display();
  };
};

/*trigger win state*/
function gameWin(team) {
  gameActive = false;
  buttonsDisabled = true;
  victoryMotif.play(audioCtx.currentTime);
  var winningMessage = "Team " + team + " wins!";
  alertOverlay.flashText(winningMessage, 4.5);
  teamA.resetHeight();
  teamB.resetHeight();
  teamAVoiceFreq = 440;
  teamBVoiceFreq = 220;
};

/* Count in game with pulsing text and pips*/
var startTimer;
var gameStartCount;

function startGame() {
  gameActive = true;
  alertOverlay.flashText('Ready?', 4.5);
	gameStartCount = 3;
	startTimer = setInterval(function(){ countdown() }, 1000);
};

function countdown() {
  if (gameStartCount == 0) {
    introPip.simpleEnv(audioCtx.currentTime, 720, 10, 250);
    alertOverlay.flashText('Mash!', 4.5);
    clearInterval(startTimer);
    buttonsDisabled = false;
  }
  else {
    introPip.simpleEnv(audioCtx.currentTime, 360, 10, 100);
    alertOverlay.flashText(gameStartCount, 8.5);
  	gameStartCount --;
  };
};
