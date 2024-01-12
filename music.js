import { Partition, JSONPartition, Note } from 'musiquejs'

// const audioContext = new AudioContext();
const partition = [
  [{note: 'D', octave: 4, beat: 1}],
  [{note: 'D', octave: 4, beat: 1}],
  [{note: 'D', octave: 5, beat: 2}],
  [{note: 'A', octave: 4, beat: 3}],
  [{note: 'G#', octave: 4, beat: 2}],
  [{note: 'G', octave: 4, beat: 2}],
  [{note: 'F', octave: 4, beat: 2}],
  [{note: 'D', octave: 4, beat: 1}],
  [{note: 'F', octave: 4, beat: 1}],
  [{note: 'G', octave: 4, beat: 1}],
];
const notes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"];


function getPitch(note, octave) {
  let step = notes.indexOf(note);
  let power = Math.pow(2, (octave * 12 + step - 57)/12);
  return 440 * power;
}

const playNote = (keys, audioContext) =>
  new Promise((resolve) => {
    const oscillators = keys.map(({ note, octave, beat }) => {
      const noteDuration = beat * 0.18;

      const gain = new GainNode(audioContext);
      gain.connect(audioContext.destination);
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01);
      gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteDuration - 0.01);

      const oscillator = new OscillatorNode(audioContext);
      oscillator.connect(gain);
      oscillator.type = 'triangle';
      oscillator.frequency.value = getPitch(note, octave);

      return { oscillator, noteDuration };
    });

    oscillators.forEach(({ oscillator }) => oscillator.start(audioContext.currentTime));

    setTimeout(() => {
      oscillators.forEach(({ oscillator }) => {
        oscillator.stop(0);
      });
      console.log(audioContext.currentTime)

      resolve();
    }, oscillators[0].noteDuration * 1000);
  }).then(r => console.log('finished'));

const playMusic = async function (audioContext) {
  for (const frequency of partition) {
    await playNote(frequency, audioContext);
  }
  console.log(audioContext.currentTime);
};

export function setupMusic(element, audioContext) {
  const accord = new Note('E', 5, 0.18);
  const accordLong = new Note('E', 5, 0.35);
  const accord2 = new Note('C', 5, 0.18);
  const accord3 = new Note('G', 5, 0.50);
  const accord4 = new Note('G', 4, 0.60);

  const testNote = new Note('G', 4, 0.60)

  const partition = new Partition([accord, accordLong, accordLong, accord2, accordLong, accord3, accord4], 'sine', audioContext)

  const jpartition = [
    {note: 'D', octave: 4, duration: 1},
    {note: 'D', octave: 4, duration: 1},
    {note: 'D', octave: 5, duration: 2},
    {note: 'A', octave: 4, duration: 3},
    {note: 'GSharp', octave: 4, duration: 2},
    {note: 'G', octave: 4, duration: 2},
    {note: 'F', octave: 4, duration: 2},
    {note: 'D', octave: 4, duration: 1},
    {note: 'F', octave: 4, duration: 1},
    {note: 'G', octave: 4, duration: 1},
  ];

  const jsonPartition = new JSONPartition(jpartition, 'sine', audioContext)

  element.addEventListener('click', () => {
    // jsonPartition.play()
    partition.play()
    // testNote.play(audioContext, 'triangle')
    // accordLong.play(audioContext, 'sine')
    // playMusic(audioContext)
  })
}
