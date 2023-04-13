import _get from 'lodash/get';

export default defineNuxtPlugin(() => {

  return {
    provide: {
      wait,
      getValue
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

function getValue(object, defaultValue = '', path = '') {
  if(path) {
    const paths = path.split('.')
    return _get(object, paths.concat('value')) || _get(object, paths) || defaultValue
  } if(!object) {
    return defaultValue
  }
  return (object.value !== undefined ? object.value : Object.keys(object).length ? object : null) || defaultValue;
}