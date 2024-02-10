![favicon.svg](favicon.svg)

# synth2024

synth2042 is a web based synth with a strong focus on simple and fast synthesis. Built using JavaScript, [ToneJS](http://localhost:63342/pages/help.html) and [AudioKeys](http://localhost:63342/pages/help.html).

# Synthesis Explained

 Oscillators are the primary sound sources in a synthesizer. They generate periodic waveforms like sine, square, triangle, and sawtooth waves. The frequency of these oscillations determines the pitch of the note. Oscillators can often be modulated to create more complex tones.

ADSR stands for Attack, Decay, Sustain, and Release, which are the four stages of an envelope that shapes the amplitude (volume) of a sound over time:

Filters shape the timbre of the sound by removing or boosting certain frequencies. Common types include low-pass filters (allowing frequencies below a cutoff point to pass through), high-pass filters (allowing frequencies above a cutoff point), and band-pass filters (allowing a range of frequencies around a center point). Filters often have resonance controls, which can emphasize frequencies at the cutoff point.

LFOs are used to modulate various parameters of the sound at low frequencies, usually below the threshold of human hearing, which means they're not heard as pitches but as a rate of change. They can modulate parameters like pitch (vibrato), volume (tremolo), or filter cutoff (wah-wah effect), creating a sense of movement and evolution in the sound.

Effects are used to further shape and enhance the sound:

 - Distortion: Adds harmonic content by overdriving the sound, often resulting in a "gritty" or "fuzzy" texture.
 - Chorus: Mixes the original signal with one or more delayed, modulated copies of itself, creating a shimmering, thickening effect that simulates multiple instruments playing in unison.
 - Delay: Creates an echo effect by playing back the original signal after a short period of time, often with the option to feed the delayed signal back into the delay line to create a repeating, decaying echo.
 - Reverb: Simulates the natural reverberations of a physical space, adding depth and ambiance to the sound, making it feel like it's in a room, hall, or other environment.

These components work together in a synthesizer to create a vast array of sounds, from the realistic emulation of acoustic instruments to otherworldly electronic textures. Each parameter provides a different aspect of control over the sound, allowing musicians and sound designers to sculpt their tones precisely. 
