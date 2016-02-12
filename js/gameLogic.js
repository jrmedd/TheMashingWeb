chrome.app.window.current().fullscreen();

var gameActive = false;
var teamA, teamB, teamAAudio, teamBAudio, teamALabel, teamBLabel;
var introPip;
var pressesToWin = 5; //presses required to win game (increase based on team sizes)
var frequencyIncrement = 7;
var alertOverlay;
var teamAVoiceFreq = 440; //starting frequency of team's audio synth
var teamBVoiceFreq = 220; //starting frequency of team's audio synth
var buttonsDisabled = true;
var buttonStates;
var lastStates = [];
for (var state = 0; state < 10; state ++){
  lastStates[state] = 0;
};
var connectionId = -1;
var gameStartText;
var startTextBlink;

/*p5.js setup*/
function setup() {
  var gameArea = createCanvas(400, 500);
  gameArea.parent('game-area');
  noStroke();
  teamA = new mashingBar(0, height, width/2, height, pressesToWin, color(254,239,110));
  teamB = new mashingBar(width/2, height, width/2, height, pressesToWin, color(255,53,197));
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
  chrome.serial.getDevices(onGetDevices);
};

/*p5.js loop*/
function draw() {
  background(0);
  teamA.display();
  teamB.display();
  alertOverlay.display();
  if (connectionId > 0 && !buttonsDisabled) {
    teamALabel.display();
    teamBLabel.display();
    $.each(buttonStates, function(index, value){
      var currentState = value;
      var lastState = lastStates[index];
      if (currentState != lastState) {
        if (currentState == 1) {
          if (index >= buttonStates.length/2) {
            teamA.incrementHeight();
            teamAVoiceFreq += frequencyIncrement;
            teamAAudio.simpleEnv(audioCtx.currentTime, teamAVoiceFreq, 25, 50);
            if (teamA.stepsPressed > pressesToWin) {
              gameWin("A")
              return false;
            };
          }
          else {
            teamB.incrementHeight();
            teamBVoiceFreq += frequencyIncrement;
            teamBAudio.simpleEnv(audioCtx.currentTime, teamBVoiceFreq, 25, 50);
            if (teamB.stepsPressed > pressesToWin) {
              gameWin("B")
              return false;
            };
          };
        };
      };
      lastStates[index] = currentState;
    });
  };
  if (!gameActive && alertOverlay.textOpacity == 0) {
    var blinkNow = millis();
    if ((blinkNow - startTextBlink) > 750.) {
      gameStartText.textOpacity = abs(gameStartText.textOpacity - 255)
      startTextBlink = blinkNow;
    }
    gameStartText.display();
  };
};

/*team A mashes - eventually replace with physical input*/
$('button[name="A"]').on('click', function() {
  teamA.incrementHeight();
  teamAVoiceFreq += frequencyIncrement;
  teamAAudio.simpleEnv(audioCtx.currentTime, teamAVoiceFreq, 25, 50);
  if (teamA.stepsPressed > pressesToWin) {
    gameWin("A")
  };
});

/*team B mashes - eventually replace with physical input*/
$('button[name="B"]').on('click', function() {
  teamB.incrementHeight();
  teamBVoiceFreq += frequencyIncrement;
  teamBAudio.simpleEnv(audioCtx.currentTime, teamBVoiceFreq, 25, 50);
  if (teamB.stepsPressed > pressesToWin) {
    gameWin("B")
  };
});

/*trigger win state*/
function gameWin(team) {
  victoryMotif.play(audioCtx.currentTime);
  buttonsDisabled = true;
  gameActive = false;
  var winningMessage = "Team " + team + " wins!";
  alertOverlay.flashText(winningMessage, 2.125);
  teamA.resetHeight();
  teamB.resetHeight();
  teamAVoiceFreq = 440;
  teamBVoiceFreq = 220;
  $('.team-buttons').prop('disabled', buttonsDisabled);
  $('button[name="start-game"]').fadeIn();
};

/* Count in game*/
var startTimer;
var gameStartCount;

$('button[name="start-game"]').on('click', function(){
  gameActive = true;
  $(this).fadeOut('fast');
  alertOverlay.flashText('Ready?', 4.25);
	gameStartCount = 3;
	startTimer = setInterval(function(){ countdown() }, 1000);
});

function countdown() {
  if (gameStartCount == 0) {
    introPip.simpleEnv(audioCtx.currentTime, 720, 10, 250);
    alertOverlay.flashText('Mash!', 2.125);
    clearInterval(startTimer);
    buttonsDisabled = false;
    $('.team-buttons').prop('disabled', buttonsDisabled);
  }
  else {
    introPip.simpleEnv(audioCtx.currentTime, 360, 10, 100);
    alertOverlay.flashText(gameStartCount, 4.25);
  	gameStartCount --;
  };
};
