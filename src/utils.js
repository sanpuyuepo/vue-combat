// 封装工具函数

// debounce
const debounce = function debounce(callback, delay, immediate) {
  if (!(typeof callback === 'function')) {
    throw new TypeError('callback must be a function')
  }
  if (typeof delay === 'undefined') delay = 100;
  if (typeof delay === 'boolean') {
    immediate = delay;
    delay = 100;
  }
  if (!(typeof immediate === 'boolean')) {
    immediate = false;
  }

  let timer = null;
  return function(...args) {
    let self = this;
    // * 考虑第一次触发还是最后一次触发
    let init = immediate && !timer; 
    // 执行最后一次触发：
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null; // timer = null 表示没有触发新的操作
      !immediate ? callback.apply(self, args) : null;
    }, delay);
    // 执行第一次触发，后面的触发就不管用了
    init ? callback.apply(self, args) : null;

    // * 考虑最后一次触发
    // clearTimeout(timer);
    // timer = setTimeout(() => {
    //   callback.apply(self, args)
    // }, delay);
  }
}

// throttle
const throttle = function throttle(callback, delay) {
  if (!(typeof callback === 'function')) {
    throw new TypeError('callback must be a function')
  }
  if (typeof delay === 'undefined') delay = 100;
  
  let previous = 0;
  let timer = null;

  return function(...args) {
    let self = this;
    let now = new Date();

    let interval = now - previous;

    if (interval >= delay) {
      clearTimeout(timer);
      timer = null;
      callback.apply(self, args);
      previous = new Date();
    } else if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        callback.apply(self, args);
        previous = new Date();
      }, delay - interval);
    }
  }
}

export default {
  debounce,
  throttle
}