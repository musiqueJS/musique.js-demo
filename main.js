import './style.css'
import { setupMusic } from './music.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="music1" type="button"></button>
    </div>
  </div>
`
let audioContext;

document.addEventListener('click',() => {
 if (audioContext === undefined) {
  audioContext = new AudioContext();
  setupMusic(document.querySelector('#music1'), audioContext)
 }
})
