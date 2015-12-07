var context = new AudioContext();

/* Osc */
var vco = context.createOscillator();
vco.frequency.value = 440;
vco.start(0);

/* Amp */
var vca = context.createGain();
vca.gain.value = 0;

/* Rotuing */
vco.connect(vca);
vca.connect(context.destination);

function linearEnvelope(a, r) {
  a = a * 0.001;
  r = r * 0.001;
  var currTime = context.currentTime;
  vca.gain.linearRampToValueAtTime(0.75, currTime + a);
  currTime += a;
  vca.gain.linearRampToValueAtTime(0, currTime + r);
};

$('button[name="A"]').on('click', function() {
  var attack = 25;
  var release = 50;
  linearEnvelope(attack, release);
});
