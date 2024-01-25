
// ----------------------------------------------------------------------------------------------------
// OSC 1
// ----------------------------------------------------------------------------------------------------

var synth1 = new Tone.PolySynth().toDestination();
synth1.volume.value = -12

synth1.set({
    oscillator: {
        type: 'sine'
    }
});

document.getElementById('volumeControl').addEventListener('input', function() {
    synth1.volume.value = parseFloat(this.value);
});

// SELECT WAVETABLE
document.getElementById('wavetableSelect').addEventListener('change', function() {
    synth1.set({
        oscillator: {
            type: this.value
        }
    });
});

// FINE DETUNE
document.getElementById('detuneControl').addEventListener('input', function() {
    synth1.set({ detune: this.value });
});

function startAdjNoteSynth1(note) {
    const pitchAdjustment = parseInt(document.getElementById('pitchControl').value);
    const frequency = Tone.Frequency(note).transpose(pitchAdjustment);
    synth1.triggerAttack(frequency);
}



// ----------------------------------------------------------------------------------------------------
// ------------------
// ----------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------
// OSC 2
// ----------------------------------------------------------------------------------------------------

var synth2 = new Tone.PolySynth().toDestination();
synth2.volume.value = -12

synth2.set({
    oscillator: {
        type: 'sine'
    }
});

document.getElementById('volumeControl2').addEventListener('input', function() {
    synth2.volume.value = parseFloat(this.value);
});

// SELECT WAVETABLE
document.getElementById('wavetableSelect2').addEventListener('change', function() {
    synth2.set({
        oscillator: {
            type: this.value
        }
    });
});

// FINE DETUNE
document.getElementById('detuneControl2').addEventListener('input', function() {
    synth2.set({ detune: this.value });
});

// function playAdjustedNoteSynth2(note, duration) {
//     const pitchAdjustment = parseInt(document.getElementById('pitchControl').value);
//     const frequency = Tone.Frequency(note).transpose(pitchAdjustment);
//     synth2.triggerAttackRelease(frequency, duration);
// }

function startAdjNoteSynth2(note) {
    const pitchAdjustment = parseInt(document.getElementById('pitchControl2').value);
    const frequency = Tone.Frequency(note).transpose(pitchAdjustment);
    synth2.triggerAttack(frequency);
}

// ----------------------------------------------------------------------------------------------------
// ------------------
// ----------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------
// BOTH
// ----------------------------------------------------------------------------------------------------

document.getElementById('polyphonyControl').addEventListener('input', function() {
    synth1.maxPolyphony = parseInt(this.value);
    synth2.maxPolyphony = parseInt(this.value);
});


document.getElementById('attackControl').addEventListener('input', function() {
    synth1.set({ envelope: { attack: parseFloat(this.value) } });
    synth2.set({ envelope: { attack: parseFloat(this.value) } });
});

document.getElementById('decayControl').addEventListener('input', function() {
    synth1.set({ envelope: { decay: parseFloat(this.value) } });
    synth2.set({ envelope: { decay: parseFloat(this.value) } });
});

document.getElementById('sustainControl').addEventListener('input', function() {
    synth1.set({ envelope: { sustain: parseFloat(this.value) } });
    synth2.set({ envelope: { sustain: parseFloat(this.value) } });
    console.log("Sustain:", this.value)
});

document.getElementById('releaseControl').addEventListener('input', function() {
    synth1.set({ envelope: { release: parseFloat(this.value) } });
    synth2.set({ envelope: { release: parseFloat(this.value) } });
    console.log("Release:", this.value)
});



// ----------------------------------------------------------------------------------------------------
// ------------------
// ----------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------
// FILTER
// ----------------------------------------------------------------------------------------------------

// const filterToggle = document.getElementById('filterToggle');
const mainFilter = new Tone.Filter(20000, "lowpass", -12);
mainFilter.Q.value = 0;



document.getElementById('filterType').addEventListener('change', function() {
    mainFilter.type = this.value;
});
document.getElementById('filterSlope').addEventListener('change', function() {
    mainFilter.rolloff = parseInt(this.value);
});
document.getElementById('cutoffControl').addEventListener('input', function() {
    mainFilter.frequency.value = parseFloat(this.value);
});
document.getElementById('resonanceControl').addEventListener('input', function() {
    mainFilter.Q.value = parseFloat(this.value);
});


// Listen for changes in the toggle switch state
document.getElementById('filterToggle').addEventListener('change', function(e) {
    if (this.checked) {
        synth1.disconnect();
        synth2.disconnect();
        synth1.connect(mainFilter);
        synth2.connect(mainFilter);
        mainFilter.toDestination();
        console.log("check")
    }
    else {
        synth1.disconnect(mainFilter);
        synth2.disconnect(mainFilter);
        synth1.toDestination();
        synth2.toDestination();
        console.log("uncheck")
    }
});

// ----------------------------------------------------------------------------------------------------
// ---------------------
// ----------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------
// LFO
// ----------------------------------------------------------------------------------------------------

const lfo1 = new Tone.LFO({
    frequency: 0.5,
    type: 'sine',
    min: 500,
    max: 1500
})

document.getElementById('lfoToggle').addEventListener('change', function(e) {
    if (this.checked) {
        lfo1.start();
        console.log("check")
    }
    else {
        lfo1.stop();
        console.log("uncheck")
    }
});

document.getElementById('lfoType').addEventListener('change', function() {
    lfo1.type = this.value;
});

document.getElementById('amplitudeControl').addEventListener('input', function() {
    lfo1.amplitude = (parseFloat(this.value));
});

document.getElementById('assignLFO').addEventListener('change', function() {
    if (this.value === 'osc1vol') {
        lfo1.max = 0;
        lfo1.min = -60;
        lfo1.disconnect()
        lfo1.connect(synth1.volume.value);
        console.log(this.value)
    }
    else if (this.value === 'osc1detune') {
        lfo1.max = 100;
        lfo1.min = -100;
        lfo1.disconnect()
        lfo1.connect(synth1.detune.value);
        console.log(this.value)
    }
    else if (this.value === 'osc1pitch') {
        lfo1.max = 12;
        lfo1.min = -12;
        lfo1.disconnect()
        lfo1.connect(synth1.detune);
        console.log(this.value)
    }
    else if (this.value === 'osc2vol') {
        lfo1.max = 0;
        lfo1.min = -60;
        lfo1.disconnect()
        lfo1.connect(synth2.volume);
        console.log(this.value)
    }
    else if (this.value === 'osc2detune') {
        lfo1.max = 100;
        lfo1.min = -100;
        lfo1.disconnect()
        lfo1.connect(synth2.detune);
        console.log(this.value)
    }
    else if (this.value === 'osc2pitch') {
        lfo1.max = 12;
        lfo1.min = -12;
        lfo1.disconnect()
        lfo1.connect(synth2.detune);
        console.log(this.value)
    }
    else if (this.value === 'filterCutoff') {
        lfo1.max = 22000;
        lfo1.min = 10;
        lfo1.disconnect()
        lfo1.connect(mainFilter.frequency.value)
        console.log(this.value)
    }
    else if (this.value === 'filterReso') {
        lfo1.max = 7;
        lfo1.min = 0;
        lfo1.disconnect()
        lfo1.connect(mainFilter.Q.value)
        console.log(this.value)
    }
});

// ----------------------------------------------------------------------------------------------------
// ---------------------
// ----------------------------------------------------------------------------------------------------

let audioContextStarted = false;

// Event listener for playing a note
document.getElementById('cnote').addEventListener('click', async () => {
    if (!audioContextStarted) {
        await Tone.start();
        console.log('Audio ready');
        audioContextStarted = true;
    }
    synth1.triggerAttackRelease("C4", 1);
    synth2.triggerAttackRelease("C4", 1);
});


const keyboard = new AudioKeys();

keyboard.down(note => {
    // Convert MIDI number to note name
    const noteName = Tone.Frequency(note.note, "midi").toNote();
    // startAdjNoteSynth1(noteName);
    // startAdjNoteSynth2(noteName);
    synth1.triggerAttack(noteName);
    synth2.triggerAttack(noteName);
});

keyboard.up(note => {
    const noteName = Tone.Frequency(note.note, "midi").toNote();
    synth1.triggerRelease(noteName);
    synth2.triggerRelease(noteName);
});