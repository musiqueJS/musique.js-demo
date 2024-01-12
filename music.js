import { Partition, Note } from 'musiquejs'

export function shroom(element, audioContext) {
  const note1 = new Note('E', 5, 0.18);
  const longNote = new Note('E', 5, 0.35);
  const note2 = new Note('C', 5, 0.18);
  const note3 = new Note('G', 5, 0.50);
  const note4 = new Note('G', 4, 0.60);

  const partition = new Partition([note1, longNote, longNote, note2, longNote, note3, note4], 'square', audioContext)

  element.addEventListener('click', () => {
    partition.play()
  })
}

export function skull(element, audioContext) {
  const note1 = new Note('D', 5, 0.18);
  const note2 = new Note('D', 5, 0.35);
  const note3 = new Note('A', 4, 0.53);
  const note4 = new Note('GSharp', 4, 0.35);
  const note5 = new Note('G', 4, 0.35);
  const note6 = new Note('F', 4, 0.35);
  const note7 = new Note('D', 4, 0.18);
  const note8 = new Note('F', 4, 0.18);
  const note9 = new Note('G', 4, 0.18);

  const partition = new Partition([
    note1,
    note1,
    note2,
    note3,
    note4,
    note5,
    note6,
    note7,
    note8,
    note9
  ], 'square', audioContext)

  element.addEventListener('click', () => {
    partition.play()
  })
}
