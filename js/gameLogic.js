var teamA, teamB, teamAAudio, teamBAudio;
var pressesToWin = 10; //presses required to win game (increase based on team sizes)
var alertOverlay;
var teamAFreqStart = 440; //starting frequency of team's audio synth
var teamBFreqStart = 220; //starting frequency of team's audio synth

/*p5.js setup*/
function setup() {
  var gameArea = createCanvas(250, 500);
  gameArea.parent('game-area');
  noStroke();
  teamA = new mashingBar(0, height, width/2, height, pressesToWin, color(254,239,110));
  teamB = new mashingBar(width/2, height, width, height, pressesToWin, color(255,53,197));
  teamAAudio = new frequencyModulator(teamAFreqStart, 2, 2);
  teamBAudio = new frequencyModulator(teamBFreqStart, 1.5, 1.75);
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

/*trigger win state*/
function gameWin(team) {
  var winningMessage = "Team " + team + " wins!";
  alertOverlay.flashText(winningMessage);
  teamA.resetHeight();
  teamB.resetHeight();
}

/*team A mashes*/
$('button[name="A"]').on('click', function() {
  teamA.incrementHeight();
  teamAFreqStart += 7;
  teamAAudio.simpleEnv(teamAFreqStart, 25, 50);
  if (teamA.stepsPressed > pressesToWin) {
    gameWin("A")
  };
});

/*team B mashes*/
$('button[name="B"]').on('click', function() {
  teamB.incrementHeight();
  teamBFreqStart += 7;
  teamBAudio.simpleEnv(teamBFreqStart, 25, 50);
  if (teamB.stepsPressed > pressesToWin) {
    gameWin("B")
  };
});
