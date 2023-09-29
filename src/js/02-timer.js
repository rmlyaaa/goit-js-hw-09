import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.addEventListener('click', startTimer);
startBtn.disabled = true;
let timerId = null;

const flatpickrr = new flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      errorTime();
    } else {
      startBtn.disabled = false;
    }
  },
});

function errorTime() {
  Notiflix.Notify.failure('Please choose a date in the future');
  startBtn.disabled = true;
}

function startTimer() {
  dateInput.disabled = true;
  timerId = setInterval(() => {
    updateTime();
  }, 1000);
  startBtn.disabled = true;
}

function updateTime() {
  const date = new Date();
  const ms = flatpickrr.selectedDates[0].getTime() - date.getTime();
  if (ms < 0) {
    clearTimeout(timerId);
    dateInput.disabled = false;
    return;
  }
  const stayTime = convertMs(ms);
  days.textContent = addLeadingZero(stayTime.days);
  hours.textContent = addLeadingZero(stayTime.hours);
  minutes.textContent = addLeadingZero(stayTime.minutes);
  seconds.textContent = addLeadingZero(stayTime.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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
