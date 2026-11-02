import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public', 'audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function writeWav(filename, durationSec, noteSequence, tempoBpm = 75, waveType = 'piano') {
  const sampleRate = 44100;
  const numChannels = 2;
  const bytesPerSample = 2; // 16-bit
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataByteLength = numSamples * numChannels * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataByteLength);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataByteLength, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1 size
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28);
  buffer.writeUInt16LE(numChannels * bytesPerSample, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34);

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataByteLength, 40);

  const secondsPerBeat = 60 / tempoBpm;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sampleL = 0;
    let sampleR = 0;

    for (const note of noteSequence) {
      const noteStartTime = note.beat * secondsPerBeat;
      const noteDuration = note.dur * secondsPerBeat;
      if (t >= noteStartTime && t < noteStartTime + noteDuration + 2.5) {
        const localT = t - noteStartTime;
        // Natural exponential decay envelope
        const envelope = Math.max(0, Math.exp(-localT * 1.6) * (1 - Math.exp(-localT * 40)));
        const freq = note.freq;

        // Harmonics for rich warm electric piano/ambient bell sound
        const osc = 0.55 * Math.sin(2 * Math.PI * freq * localT) +
                    0.25 * Math.sin(2 * Math.PI * freq * 2 * localT) * Math.exp(-localT * 2.8) +
                    0.12 * Math.sin(2 * Math.PI * freq * 3 * localT) * Math.exp(-localT * 4.2) +
                    0.08 * Math.sin(2 * Math.PI * freq * 4 * localT) * Math.exp(-localT * 5.5);

        const pan = note.pan || 0; // -1 to 1
        const leftGain = (1 - pan) * 0.5;
        const rightGain = (1 + pan) * 0.5;

        sampleL += osc * envelope * note.vol * leftGain;
        sampleR += osc * envelope * note.vol * rightGain;
      }
    }

    // Gentle master warm reverb-like decay and soft clipping
    sampleL = Math.max(-0.95, Math.min(0.95, sampleL * 0.85));
    sampleR = Math.max(-0.95, Math.min(0.95, sampleR * 0.85));

    const intSampleL = Math.floor(sampleL * 32767);
    const intSampleR = Math.floor(sampleR * 32767);

    const offset = 44 + i * 4;
    buffer.writeInt16LE(intSampleL, offset);
    buffer.writeInt16LE(intSampleR, offset + 2);
  }

  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated: ${filePath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

// Track 1: Deep Focus (C major / A minor ambient chords)
// Notes: C4=261.63, E4=329.63, G4=392.00, B4=493.88, D5=587.33, A4=440.00, F4=349.23
const track1Notes = [
  // Bar 1: Cmaj7 (C4, E4, G4, B4)
  { freq: 261.63, beat: 0, dur: 4, vol: 0.5, pan: -0.2 },
  { freq: 329.63, beat: 0.2, dur: 3.8, vol: 0.45, pan: 0.1 },
  { freq: 392.00, beat: 0.4, dur: 3.6, vol: 0.4, pan: 0.3 },
  { freq: 493.88, beat: 1.5, dur: 2.5, vol: 0.45, pan: -0.1 },
  { freq: 587.33, beat: 2.5, dur: 2.0, vol: 0.38, pan: 0.25 },

  // Bar 2: Am9 (A3, C4, E4, G4, B4)
  { freq: 220.00, beat: 4, dur: 4, vol: 0.5, pan: 0.2 },
  { freq: 261.63, beat: 4.2, dur: 3.8, vol: 0.45, pan: -0.2 },
  { freq: 329.63, beat: 4.4, dur: 3.6, vol: 0.4, pan: 0.1 },
  { freq: 493.88, beat: 5.5, dur: 2.5, vol: 0.45, pan: 0.3 },
  { freq: 440.00, beat: 6.5, dur: 2.0, vol: 0.4, pan: -0.3 },

  // Bar 3: Fmaj7 (F3, A3, C4, E4)
  { freq: 174.61, beat: 8, dur: 4, vol: 0.5, pan: -0.25 },
  { freq: 220.00, beat: 8.2, dur: 3.8, vol: 0.45, pan: 0.2 },
  { freq: 261.63, beat: 8.4, dur: 3.6, vol: 0.4, pan: -0.1 },
  { freq: 329.63, beat: 9.5, dur: 2.5, vol: 0.45, pan: 0.2 },
  { freq: 392.00, beat: 10.5, dur: 2.0, vol: 0.38, pan: -0.2 },

  // Bar 4: Gsus4 -> G (G3, C4, D4 -> B3)
  { freq: 196.00, beat: 12, dur: 4, vol: 0.5, pan: 0.1 },
  { freq: 261.63, beat: 12.2, dur: 2.0, vol: 0.45, pan: -0.15 },
  { freq: 293.66, beat: 12.4, dur: 3.6, vol: 0.4, pan: 0.25 },
  { freq: 246.94, beat: 14.0, dur: 2.0, vol: 0.45, pan: -0.1 },
  { freq: 392.00, beat: 14.5, dur: 2.0, vol: 0.35, pan: 0.15 },

  // Repeat higher octave melody
  { freq: 523.25, beat: 16, dur: 4, vol: 0.5, pan: -0.1 },
  { freq: 659.25, beat: 17.5, dur: 3, vol: 0.45, pan: 0.2 },
  { freq: 587.33, beat: 19.0, dur: 2, vol: 0.4, pan: -0.2 },
  { freq: 440.00, beat: 20, dur: 4, vol: 0.5, pan: 0.15 },
  { freq: 493.88, beat: 21.5, dur: 3, vol: 0.42, pan: -0.2 },
  { freq: 392.00, beat: 23.0, dur: 2, vol: 0.38, pan: 0.2 },
];

writeWav('deep-focus.wav', 22, track1Notes, 72);

// Track 2: Late Night Lo-Fi (Warm Pentatonic Chords)
const track2Notes = [
  { freq: 293.66, beat: 0, dur: 4, vol: 0.5, pan: -0.3 }, // D4
  { freq: 369.99, beat: 0.3, dur: 3.7, vol: 0.45, pan: 0.2 }, // F#4
  { freq: 440.00, beat: 0.6, dur: 3.4, vol: 0.4, pan: -0.1 }, // A4
  { freq: 554.37, beat: 1.5, dur: 2.5, vol: 0.45, pan: 0.3 }, // C#5

  { freq: 246.94, beat: 4, dur: 4, vol: 0.5, pan: 0.2 }, // B3
  { freq: 293.66, beat: 4.3, dur: 3.7, vol: 0.45, pan: -0.2 }, // D4
  { freq: 369.99, beat: 4.6, dur: 3.4, vol: 0.4, pan: 0.1 }, // F#4
  { freq: 440.00, beat: 5.5, dur: 2.5, vol: 0.42, pan: -0.3 }, // A4

  { freq: 196.00, beat: 8, dur: 4, vol: 0.5, pan: -0.2 }, // G3
  { freq: 246.94, beat: 8.3, dur: 3.7, vol: 0.45, pan: 0.2 }, // B3
  { freq: 293.66, beat: 8.6, dur: 3.4, vol: 0.4, pan: -0.1 }, // D4
  { freq: 369.99, beat: 9.5, dur: 2.5, vol: 0.45, pan: 0.25 }, // F#4

  { freq: 220.00, beat: 12, dur: 4, vol: 0.5, pan: 0.1 }, // A3
  { freq: 277.18, beat: 12.3, dur: 3.7, vol: 0.45, pan: -0.2 }, // C#4
  { freq: 329.63, beat: 12.6, dur: 3.4, vol: 0.4, pan: 0.2 }, // E4
  { freq: 440.00, beat: 14, dur: 2.5, vol: 0.4, pan: -0.1 }, // A4
];

writeWav('late-night-lofi.wav', 18, track2Notes, 68);
