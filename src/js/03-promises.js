const form = document.querySelector('.form');
const submitBtn = form.querySelector('[type="submit"]');

function onSubmitForm(event) {
  event.preventDefault();
  const amountInputValue = Number(event.target.elements.amount.value);
  const stepInputValue = Number(event.target.elements.step.value);
  let delayInputValue = Number(event.target.elements.delay.value);

  // console.log(amountInputValue, stepInputValue, delayInputValue);

  //let count = 0;
  for (let i = 0; i < amountInputValue; i++) {
    // count++;
    // const newDelay = delayInputValue + i * stepInputValue;
    // console.log(` Fulfilled promise ${count} in ${newDelay}ms`);
    createPromise(i, delayInputValue)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position + 1} in ${delay}ms`);
      });
    delayInputValue += stepInputValue;
  }
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