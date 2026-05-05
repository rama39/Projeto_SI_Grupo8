
let audioCtx;

let mute = true;

function playStepSound() {
  if (mute) return; // Não toca som se estiver mudo
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  let osc = audioCtx.createOscillator();
  let gain = audioCtx.createGain();

  osc.type = "square"; // 8-bit style
  osc.frequency.value = random(400, 900); // slight variation

  gain.gain.value = 0.03; // volume (keep low!)

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.03); // very short beep
}

let moveOsc, moveGain;

function playMoveSound() {
  if (mute) return; // Não toca som se estiver mudo

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (moveOsc) return; // já tocando

  moveOsc = audioCtx.createOscillator();
  moveGain = audioCtx.createGain();

  moveOsc.type = "triangle"; // mais suave que square
  moveOsc.frequency.value = 300;

  moveGain.gain.value = 0.04;

  moveOsc.connect(moveGain);
  moveGain.connect(audioCtx.destination);

  moveOsc.start();
}
function stopMoveSound() {
  if (moveOsc) {
    moveOsc.stop();
    moveOsc.disconnect();
    moveOsc = null;
  }
}
function updateMoveSound() {
  if (!moveOsc) return;

  // exemplo: pitch baseado na posição Y (visualmente legal)
  let freq = map(agenteReal.y, 0, height, 200, 800);

  moveOsc.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.05);
}

function toggleMute() {
  mute = !mute;

  // atualiza texto do botão
  botaoMute.html(mute ? "🔇" : "🔊");

  // garante que som contínuo pare ao mutar
  if (mute) {
    stopMoveSound();
  }
}