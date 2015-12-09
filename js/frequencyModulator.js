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
  this.modFreq = this.carrierFreq * this.carrierRel;
  this.modulator.frequency.value = this.modFreq;
  this.modulatorDepth = context.createGain();
  this.modulatorDepth.gain.value = this.modIndex * this.modFreq;

  /* Rotuing */
  this.modulator.connect(this.modulatorDepth);
  this.modulatorDepth.connect(this.carrier.frequency);
  this.carrier.connect(this.vca);
  this.vca.connect(context.destination);

  this.simpleEnv = function(freqChange, attack, release){
    this.carrier.frequency.value = freqChange; //carrier changes also need to affect modulator changes (abstract this!)
    this.attackTime = attack * 0.001; //attack time convert from ms
    this.releaseTime = release * 0.001; //release time convert from ms
    this.currTime = context.currentTime;
    this.vca.gain.linearRampToValueAtTime(1, this.currTime + this.attackTime);
    this.currTime += this.attackTime;
    this.vca.gain.linearRampToValueAtTime(0, this.currTime + this.releaseTime);
  }
}
