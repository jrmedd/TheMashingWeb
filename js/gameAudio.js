/* Create AudioContext and master volume control */
var audioCtx = new AudioContext;
masterVolume = audioCtx.createGain();
masterVolume.gain.value = 0.5;
masterVolume.connect(audioCtx.destination);

var sequencerTempo = 125;
var victoryMotifNotes = ['G3 s', 'C4 s', 'E4 s', 'G4 s', '- s', 'E4 s', 'G4 s', '- s' ]
victoryMotif = new TinyMusic.Sequence(audioCtx, sequencerTempo, victoryMotifNotes);
victoryMotif.loop = false;
victoryMotif.gain.gain.value = 0.4
victoryMotif.staccato = 0.5;
victoryMotif.waveType = 'triangle';

function simpleSynth(initFreq, initRel, initIndex) {
  /* Carrier oscillator */
  this.carrier = audioCtx.createOscillator();
  this.carrierFreq = initFreq;
  this.carrier.frequency.value = this.carrierFreq;
  this.carrier.start(0);

  /* Amp */
  this.vca = audioCtx.createGain();
  this.vca.gain.value = 0;

  /* modulator */
  this.modulator = audioCtx.createOscillator();
  this.modIndex = initIndex;
  this.carrierRel = initRel;
  this.modFreq = this.carrierFreq * this.carrierRel;
  this.modulator.frequency.value = this.modFreq;
  this.modulator.start(0);
  this.modulatorDepth = audioCtx.createGain();
  this.modulatorDepth.gain.value = this.modIndex * this.modFreq;

  /* Rotuing */
  this.modulator.connect(this.modulatorDepth);
  this.modulatorDepth.connect(this.carrier.frequency);
  this.carrier.connect(this.vca);
  this.vca.connect(masterVolume);

  this.simpleEnv = function(time, freqChange, attack, release){
    this.modFreq = freqChange * this.carrierRel;
    this.modulator.frequency.value = this.modFreq;
    this.modulatorDepth.gain.value = this.modIndex * this.modFreq;
    this.carrier.frequency.value = freqChange; //carrier changes also need to affect modulator changes (abstract this!)
    this.attackTime = attack * 0.001; //attack time convert from ms
    this.releaseTime = release * 0.001; //release time convert from ms
    this.triggerTime = time;
    this.vca.gain.linearRampToValueAtTime(1, this.triggerTime + this.attackTime);
    this.triggerTime += this.attackTime;
    this.vca.gain.linearRampToValueAtTime(0, this.triggerTime + this.releaseTime);
  };
};
