var teamA, teamB, teamAAudio, teamBAudio;
var introPip;
var pressesToWin = 25; //presses required to win game (increase based on team sizes)
var alertOverlay;
var teamAVoiceFreq = 440; //starting frequency of team's audio synth
var teamBVoiceFreq = 220; //starting frequency of team's audio synth
var buttonsDisabled = true;

/*p5.js setup*/
function setup() {
  var gameArea = createCanvas(250, 500);
  gameArea.parent('game-area');
  noStroke();
  teamA = new mashingBar(0, height, width/2, height, pressesToWin, color(254,239,110));
  teamB = new mashingBar(width/2, height, width/2, height, pressesToWin, color(255,53,197));
  teamAAudio = new simpleSynth(teamAVoiceFreq, 2, 2);
  teamBAudio = new simpleSynth(teamBVoiceFreq, 1.5, 1.75);
  introPip = new simpleSynth(360, 1, 0);
  alertOverlay = new gameText(width/2, height/2, 48);
  textFont('Bangers');
  chrome.serial.getDevices(onGetDevices);
};

/*p5.js loop*/
function draw() {
  background(255);
  teamA.display();
  teamB.display();
  alertOverlay.display();
};

/*trigger win state*/
function gameWin(team) {
  var winningMessage = "Team " + team + " wins!";
  alertOverlay.flashText(winningMessage, 2.125);
  teamA.resetHeight();
  teamB.resetHeight();
  buttonsDisabled = true;
  $('.team-buttons').prop('disabled', buttonsDisabled);
  $('button[name="start-game"]').fadeIn();
}
/* Count in game*/
var startTimer;
var gameStartCount;

$('button[name="start-game"]').on('click', function(){
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

/*team A mashes - eventually replace with physical input*/
$('button[name="A"]').on('click', function() {
  teamA.incrementHeight();
  teamAVoiceFreq += 7;
  teamAAudio.simpleEnv(audioCtx.currentTime, teamAVoiceFreq, 25, 50);
  if (teamA.stepsPressed > pressesToWin) {
    gameWin("A")
  };
});

/*team B mashes - eventually replace with physical input*/
$('button[name="B"]').on('click', function() {
  teamB.incrementHeight();
  teamBVoiceFreq += 7;
  teamBAudio.simpleEnv(audioCtx.currentTime, teamBVoiceFreq, 25, 50);
  if (teamB.stepsPressed > pressesToWin) {
    gameWin("B")
  };
});

function onGetDevices(ports){
  $.each(ports, function(key, value) {
    $('#serial-select').append($('<option></option>').attr('value', value.path).text(value.path));
  });
};
