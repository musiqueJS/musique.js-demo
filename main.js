import './style.css'
import { shroom, skull } from './music.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Musique.js v1 is out!</h1>
    <p>Click on a button to play a song!</p>
    <div class="card">
      <button id="music1" type="button">🍄</button>
      <button id="music2" type="button">💀</button>
    </div>
  </div>
`
let audioContext;

document.addEventListener('click',() => {
 if (audioContext === undefined) {
  audioContext = new AudioContext();
  shroom(document.querySelector('#music1'), audioContext)
  skull(document.querySelector('#music2'), audioContext)
 }
})
