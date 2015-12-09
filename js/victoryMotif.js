/* sketch around a victory motif */
var victory = [55,60,64,67,0,64,67,0]; // midi notes for victory melody (0 == rest)

/* function pilfered from Mozilla(?) to convert MIDI note to frequency */
function frequencyFromNoteNumber(note) {
 return 440 * Math.pow(2,(note-69)/12);
}
