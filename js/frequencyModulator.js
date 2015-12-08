var context = new AudioContext;

function frequencyModulator(initFreq, initRel, initIndex) {
  /* Carrier oscillator */
  this.carrier = context.createOscillator();
  this.carrierFreq = initFreq;
  this.carrier.frequency.value = this.carrierFreq;
  this.carrier.start(0);

  /* Amp */
  this.vca = context.createGain();
  this.vca.gain.value = 0;

  /* modulator */
  this.modulator = context.createOscillator();
  this.modIndex = initIndex;
  this.carrierRel = initRel;
  this.modFreq = this.carrierFreq*this.carrierRel;
  this.modulator.frequency.value = this.carrierFreq*1.25;
  this.modulator.start(0);
  this.modulatorDepth = context.createGain();
  this.modulatorDepth.gain.value = this.modIndex*this.modFreq;
  this.modulator.connect(this.modulatorDepth);
  this.modulatorDepth.connect(this.carrier.frequency);

  /* Rotuing */
  this.carrier.connect(this.vca);
  this.vca.connect(context.destination);

  this.simpleEnv = function(freqChange, attack, release){
    this.carrier.frequency.value = freqChange; //carrier changes also need to affect modulator changes (abstract this!)
    this.attackTime = attack * 0.001; //attack time convert from ms
    this.releaseTime = release * 0.001; //release time convert from ms
    this.currTime = context.currentTime;
    this.vca.gain.linearRampToValueAtTime(0.75, this.currTime + this.attackTime);
    this.currTime += this.attackTime;
    this.vca.gain.linearRampToValueAtTime(0, this.currTime + this.releaseTime);
  }
}

/* sketch around a victory motif */
var victory = [55,60,64,67,0,64,67,0]; // midi notes for victory melody (0 == rest)

/* function pilfered from Mozilla(?) to convert MIDI note to frequency */
function frequencyFromNoteNumber(note) {
 return 440 * Math.pow(2,(note-69)/12);
}
