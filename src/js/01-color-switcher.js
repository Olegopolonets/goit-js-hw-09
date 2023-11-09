const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
console.log(stopBtn);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let timerColor;
startBtn.addEventListener('click', () => {
  timerColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled', false);
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerColor);
  startBtn.removeAttribute('disabled', true);
  stopBtn.setAttribute('disabled', true);
});
