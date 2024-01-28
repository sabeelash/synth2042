
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

document.getElementById('toggleOsc1').addEventListener('change', function() {
    if (this.checked) {
        synth1.toDestination();
        console.log("check")
    } else {
        synth1.disconnect();
    }
});

document.getElementById('volumeControl').addEventListener('input', function() {
    if (this.value === -145){
        synth1.volume.value = -Infinity;
    }
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


// ----------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------
// OSC 2
// ----------------------------------------------------------------------------------------------------

var synth2 = new Tone.PolySynth();
synth2.volume.value = -Infinity;
synth2.disconnect();

synth2.set({
    oscillator: {
        type: 'sine'
    }
});

firstTime = true;

document.getElementById('toggleOsc2').addEventListener('change', function() {
    if (this.checked) {
        if (firstTime === true){
            synth2.volume.value = -12;
            firstTime = false;
        }
        synth2.toDestination();
    } else {
        synth2.disconnect();
    }
});

document.getElementById('volumeControl2').addEventListener('input', function() {
    if (this.value === -145){
        synth2.volume.value = -Infinity;
    }
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

// ----------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------
// BOTH
// ----------------------------------------------------------------------------------------------------

// DEFAULT VALUES -------------------------------
synth1.set({ envelope: { attack: 0.01 } });
synth2.set({ envelope: { attack: 0.01 } });

synth1.set({ envelope: { decay: 0 } });
synth2.set({ envelope: { decay: 0 } });

synth1.set({ envelope: { sustain: 1 } });
synth2.set({ envelope: { sustain: 1 } });

synth1.set({ envelope: { release: 0.3 } });
synth2.set({ envelope: { release: 0.3 } });

// -----------------------------------------------

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
});

document.getElementById('releaseControl').addEventListener('input', function() {
    synth1.set({ envelope: { release: parseFloat(this.value) } });
    synth2.set({ envelope: { release: parseFloat(this.value) } });
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


document.getElementById('filterToggle').addEventListener('change', function(e) {
    if (this.checked) {
        synth1.disconnect();
        // synth2.disconnect();
        synth1.connect(mainFilter);
        // synth2.connect(mainFilter);
        mainFilter.toDestination();
        console.log("check")
    }
    else {
        synth1.disconnect(mainFilter);
        // synth2.disconnect(mainFilter);
        synth1.toDestination();
        // synth2.toDestination();
        console.log("uncheck")
    }
});

// ----------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------
// LFO
// ----------------------------------------------------------------------------------------------------

const lfo1 = new Tone.LFO(0.5, -144, 0);

lfo1.amplitude.value = 0;

document.getElementById('lfoToggle').addEventListener('change', function(e) {
    if (this.checked) {
        lfo1.start();
        console.log("check")
    }
    else {
        lfo1.stop();
        lfo1.disconnect();
        console.log("uncheck")
    }
});
document.getElementById('lfoType').addEventListener('change', function() {
    lfo1.type = this.value;
});

document.getElementById('amplitudeControl').addEventListener('input', function() {
    lfo1.amplitude.value = parseFloat(this.value);
});

document.getElementById('lfospeed').addEventListener('input', function() {
    lfo1.frequency.value = parseFloat(this.value);
});

document.getElementById('assignLFO').addEventListener('change', function() {
    if (this.value === 'bothOscVol') {
        lfo1.max.value = 0;
        lfo1.min.value = -144;
        lfo1.disconnect()
        lfo1.stop()
        lfo1.connect(synth1.volume);
        lfo1.connect(synth2.volume);
        lfo1.start();
    }
    else if (this.value === 'osc1vol') {
        lfo1.max.value = 0;
        lfo1.min.value = -144;
        lfo1.disconnect()
        lfo1.stop()
        lfo1.connect(synth1.volume);
        lfo1.start();
    }
    else if (this.value === 'osc2vol') {
        lfo1.max.value = 0;
        lfo1.min.value = -144;
        lfo1.disconnect()
        lfo1.stop();
        lfo1.connect(synth2.volume);
        lfo1.start();
    }
    else if (this.value === 'filterCutoff') {
        lfo1.max = 20000;
        lfo1.min = 20;
        lfo1.disconnect();
        lfo1.stop();
        lfo1.connect(mainFilter.frequency);
        lfo1.start();
    }
    else if (this.value === 'filterReso') {
        lfo1.max = 7;
        lfo1.min = 0;
        lfo1.disconnect()
        lfo1.stop();
        lfo1.connect(mainFilter.Q).start();
        lfo1.start();
    }
});

// ----------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------
// REVERB
// ----------------------------------------------------------------------------------------------------
const reverb = new Tone.Reverb(2);
reverb.wet.value = 0;

document.getElementById('reverbToggle').addEventListener('change', function() {
    if (this.checked) {
        synth1.connect(reverb);
        synth2.connect(reverb);
        reverb.toDestination();
    } else {
        synth1.disconnect(reverb);
        synth2.disconnect(reverb);
    }
});

document.getElementById('reverbDecay').addEventListener('input', function() {
    reverb.decay = parseFloat(this.value);
});

document.getElementById('reverbPreDelay').addEventListener('input', function() {
    reverb.preDelay = parseFloat(this.value);
});

document.getElementById('reverbWet').addEventListener('input', function() {
    reverb.wet.value = parseFloat(this.value);
});

// ----------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------
// CHORUS
// ----------------------------------------------------------------------------------------------------

const chorus = new Tone.Chorus(1.5, 2.5, 0.7);

chorus.wet.value = 0;

document.getElementById('chorusToggle').addEventListener('change', function() {
    if (this.checked) {
        synth1.connect(chorus);
        synth2.connect(chorus);
        chorus.toDestination();
    } else {
        synth1.disconnect(chorus);
        synth2.disconnect(chorus);
    }
});

document.getElementById('chorusFrequency').addEventListener('input', function() {
    chorus.frequency.value = parseFloat(this.value);
});

document.getElementById('chorusDelayTime').addEventListener('input', function() {
    chorus.delayTime = parseFloat(this.value);
});

document.getElementById('chorusDepth').addEventListener('input', function() {
    chorus.depth = parseFloat(this.value);
});

document.getElementById('chorusWet').addEventListener('input', function() {
    chorus.wet.value = parseFloat(this.value);
});



// ----------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------
// FEEDBACK DELAY
// ----------------------------------------------------------------------------------------------------

const feedbackDelay = new Tone.FeedbackDelay("0.25", 0.5);
feedbackDelay.wet.value = 0;

document.getElementById('delayToggle').addEventListener('change', function() {
    if (this.checked) {
        synth1.connect(feedbackDelay);
        synth2.connect(feedbackDelay);
        feedbackDelay.toDestination();
    } else {
        synth1.disconnect(feedbackDelay);
        synth2.disconnect(feedbackDelay);
    }
});

document.getElementById('delayTime').addEventListener('input', function() {
    feedbackDelay.delayTime.value = parseFloat(this.value);
});

document.getElementById('feedback').addEventListener('input', function() {
    feedbackDelay.feedback.value = parseFloat(this.value);
});

document.getElementById('delayWet').addEventListener('input', function() {
    feedbackDelay.wet.value = parseFloat(this.value);
});


// ----------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------------
// DISTORTION
// ----------------------------------------------------------------------------------------------------

const distortion = new Tone.Distortion(0.5);
distortion.wet.value = 0;

document.getElementById('distortionToggle').addEventListener('change', function() {
    if (this.checked) {
        synth1.connect(distortion);
        synth2.connect(distortion);
        distortion.toDestination();
    } else {
        synth1.disconnect(distortion);
        synth2.disconnect(distortion);
    }
});

document.getElementById('distortionAmount').addEventListener('input', function() {
    distortion.distortion = parseFloat(this.value);
});

document.getElementById('distortionWet').addEventListener('input', function() {
    distortion.wet.value = parseFloat(this.value);
});

// ----------------------------------------------------------------------------------------------------


let audioContextStarted = false;

const limiter = new Tone.Limiter(-1); // Threshold at -1 dB
synth1.connect(limiter);
synth2.connect(limiter);
limiter.toDestination();


const keyboard = new AudioKeys();

keyboard.down(note => {
    if (!audioContextStarted) {
        Tone.start();
        console.log('Audio ready');
        audioContextStarted = true;
    }
    const noteName = Tone.Frequency(note.note, "midi").toNote();
    synth1.triggerAttack(noteName);
    synth2.triggerAttack(noteName);
});

keyboard.up(note => {
    const noteName = Tone.Frequency(note.note, "midi").toNote();
    synth1.triggerRelease(noteName);
    synth2.triggerRelease(noteName);
});