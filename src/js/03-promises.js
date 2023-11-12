import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const randomBtn = form.querySelector('[type="button"]');
const backdrop = document.querySelector('.backdrop');
const iconClose = backdrop.querySelector('.icon-close');

function onSubmitForm(event) {
  event.preventDefault();
  const amountInputValue = Number(event.target.elements.amount.value);
  const stepInputValue = Number(event.target.elements.step.value);
  let delayInputValue = Number(event.target.elements.delay.value);

  for (let i = 0; i < amountInputValue; i++) {
    createPromise(i, delayInputValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Yee-haw! Fulfilled promise ${position + 1} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Oops!… Fulfilled promise ${position + 1} in ${delay}ms`);
      });
    delayInputValue += stepInputValue;
  }
  form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay,
        });
      } else {
        reject({
          position,
          delay,
        });
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmitForm);

const amount = form.querySelector('[name="amount"]');
const step = form.querySelector('[name="step"]');
const delay = form.querySelector('[name="delay"]');

function isNegative(event) {
  if (Number(event.target.value) < 0) {
    Notify.warning("Marty McFly's, we can't go back in time!");
    event.target.value = '';
  }
}
amount.addEventListener('change', isNegative);
step.addEventListener('change', isNegative);
delay.addEventListener('change', isNegative);

let countClickReset = 0;

randomBtn.addEventListener('click', () => {
  delay.value = Math.floor(Math.random() * 10 + 1) * 1000;
  step.value = Math.floor(Math.random() * 10 + 1) * 100;
  amount.value = Math.floor(Math.random() * 10) + 1;
  countClickReset += 1;
  if (countClickReset % 5 === 0) {
    modalPay();
  }
});

function modalPay() {
  backdrop.classList.add('is-open');
}

const modalRight = document.querySelector('.modal-right');

const formPay = modalRight.querySelector('.js-form-pay');
const numberCardInput = modalRight.querySelector('#person-number');
const expyresMonthInput = modalRight.querySelector('#expyres-month');
const creditExpyresYearInput = modalRight.querySelector('#input-credit-expyres-year');
const cardCvcInput = modalRight.querySelector('#card-cvc');

const cardDecorNumber = modalRight.querySelector('.js-card-decor-number');
const cardDecorMonth = modalRight.querySelector('.js-card-decor-month');
const cardDecorYear = modalRight.querySelector('.js-card-decor-year');
const cardDecorCvc = modalRight.querySelector('.js-card-decor-cvc');

backdrop.addEventListener('click', event => {
  const target = event.target;
  if (
    target.classList.contains('backdrop') ||
    target.closest('.icon-close') ||
    target.classList.contains('js-button-no-pay')
  ) {
    backdrop.classList.remove('is-open');
    Notify.info(`ZHADINA`);
  }
});

formPay.addEventListener('input', event => {
  cardDecorNumber.textContent = numberCardInput.value;
  cardDecorMonth.textContent = expyresMonthInput.value;
  cardDecorYear.textContent = creditExpyresYearInput.value;
  cardDecorCvc.textContent = cardCvcInput.value;
});

formPay.addEventListener('submit', event => {
  event.preventDefault();
  Notify.success(`Thank you very much, payment is confirmed.`);
  backdrop.remove();
});
