export function formatTime(time) {
    let hr = Math.floor(time / 3600);
    time = time % 3600;
    let min = Math.floor(time / 60);
    time = time % 60;
    let sec = time;
    return {hr:formatNum(hr),
      min:formatNum(min),
      sec:formatNum(sec)};
  }

export function formatNum(num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return String(num);
    }
  }