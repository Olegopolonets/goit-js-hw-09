import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Fireworks } from 'fireworks-js';

const container = document.querySelector('.container');
const stopFireworks = document.querySelector('.stop-fireworks');
const fireworks = new Fireworks(container, {
  autoresize: true,
  opacity: 0.5,
  acceleration: 1.05,
  friction: 0.97,
  gravity: 1.5,
  particles: 50,
  traceLength: 3,
  traceSpeed: 10,
  explosion: 5,
  intensity: 30,
  flickering: 50,
  lineStyle: 'round',
  hue: {
    min: 0,
    max: 360,
  },
  delay: {
    min: 30,
    max: 60,
  },
  rocketsPoint: {
    min: 50,
    max: 50,
  },
  lineWidth: {
    explosion: {
      min: 1,
      max: 3,
    },
    trace: {
      min: 1,
      max: 2,
    },
  },
  brightness: {
    min: 50,
    max: 80,
  },
  decay: {
    min: 0.015,
    max: 0.03,
  },
  mouse: {
    click: false,
    move: false,
    max: 1,
  },
});
const input = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');
const daysOutput = document.querySelector('span[data-days]');
const hoursOutput = document.querySelector('span[data-hours]');
const minutesOutput = document.querySelector('span[data-minutes]');
const secondsOutput = document.querySelector('span[data-seconds]');

let userDate;
start.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0];
    if (userDate > Date.now()) {
      start.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer() {
  start.setAttribute('disabled', true);
  timerInterval = setInterval(() => {
    const currentTime = convertMs(userDate - Date.now());
    const sumDateSeconds = Object.values(currentTime).reduce((a, b) => a + b, 0);
    if (sumDateSeconds < 0) {
      clearInterval(timerInterval);
      fireworks.start();
      return;
    }

    secondsOutput.textContent = addLeadingZero(currentTime.seconds);
    minutesOutput.textContent = addLeadingZero(currentTime.minutes);
    hoursOutput.textContent = addLeadingZero(currentTime.hours);
    daysOutput.textContent = addLeadingZero(currentTime.days);
    fireworks.stop();
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

start.addEventListener('click', startTimer);
