
var playing = false;


function chay_helper_play(midiData) {
    //////////////////////////////////////////////////////////////////////////////////////  
    // TONES.js 
    // I now use tone to play the MIDI data.
    //////////////////////////////////////////////////////////////////////////////////////

    const currentMidi = new Midi(midiData)

    const synth = new Tone.Synth().toDestination();
    const synths = [];
    const now = Tone.now();

    if (play = true) {
        if (playing == false && currentMidi) {

            const now = Tone.now() + 0.5;

            currentMidi.tracks.forEach((track) => {

                // Create a synth for each track.

                const synth = new Tone.PolySynth(Tone.Synth, {
                    envelope: {
                        attack: 0.02,
                        decay: 0.1,
                        sustain: 0.3,
                        release: 1,
                    },
                }).toDestination();

                synths.push(synth);

                // Schedule all of the events.

                track.notes.forEach((note) => {
                    synth.triggerAttackRelease(
                        note.name,
                        note.duration,
                        note.time + now,
                        note.velocity
                    );
                });
            });

        } else {

            // Dispose the synth and make a new one

            while (synths.length) {
                const synth = synths.shift();
                synth.disconnect();
            }

            playing = false
        }
    }
}

function chay_helper_download( midiData ) {
    // Generate MIDI data and trigger download

    const blob = new Blob([new Uint8Array(midiData)], { type: 'audio/midi' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'melody.mid';
    a.click();
    URL.revokeObjectURL(url);
}