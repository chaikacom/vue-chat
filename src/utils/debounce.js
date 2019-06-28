export default function (callback, delay = 0) {
  let timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(this, arguments)
    }, delay)
  }
}
