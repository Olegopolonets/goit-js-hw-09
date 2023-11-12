const contentWrapper = document.querySelector('.content-wrapper');
const startBtn = contentWrapper.querySelector('button[data-start]');
const stopBtn = contentWrapper.querySelector('button[data-stop]');
const palmBlue = contentWrapper.querySelector('.palm-blue');
const palmRed = contentWrapper.querySelector('.palm-red');

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
    palmRed.classList.add('image-opacity');
    palmBlue.classList.remove('image-opacity');
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerColor);
  startBtn.removeAttribute('disabled', true);
  stopBtn.setAttribute('disabled', true);
  palmBlue.classList.add('image-opacity');
  palmRed.classList.remove('image-opacity');
});
