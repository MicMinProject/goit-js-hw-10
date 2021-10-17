const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
}

function makePromises({ delay, step, amount }) {
  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });

    delay += step;
  }
}

function createPromiseBtn(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  makePromises({
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),
  });

  event.currentTarget.reset();
}

form.addEventListener('submit', createPromiseBtn);