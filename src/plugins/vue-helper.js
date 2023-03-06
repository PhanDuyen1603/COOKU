export default defineNuxtPlugin(() => {

  return {
    provide: {
      wait
    }
  }
})

function wait(time = 0) {
  return new Promise((resolve) => {
    nextTick().then(() => {
      if (process.client) {
        window.requestAnimationFrame(() => {
          setTimeout(resolve, time);
        });
      } else {
        setTimeout(resolve, time);
      }
    });
  });
}