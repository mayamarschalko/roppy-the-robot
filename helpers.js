const say = require("say");

function addHelpers() {
  // let message = '';

  global.write = console.log;
  global.wait = function(s, cb) {
    setTimeout(cb, s * 1000);
  };
  global.speak = function(msg) {
    // if (message !== msg) {
    say.speak(msg);
    // message = msg;
    // }
  };
  global.random = function(from, to) {
    if (Array.isArray(from)) {
      const randomIndex = Math.floor(Math.random() * from.length) + 0;
      return from[randomIndex];
    } else {
      return Math.floor(Math.random() * to) + from;
    }
  };
  global.toPercent = function(value) {
    return Math.round(((1024 - value) / 1024) * 100);
  };
  global.forever = Number.POSITIVE_INFINITY;
  global.never = 0;
  global.repeat = function(iterations, delay, callback) {
    let count = 0;
    let timer = null;

    const iterate = () => {
      if (count <= iterations) {
        callback(count + 1);
        timer = setTimeout(iterate, delay * 1000);
        count++;
      } else {
        // process.exit()
      }
    };

    iterate();
  };
  global.limit = function(value) {
    return parseInt(((1024 - value) / 1024) * 10) + 1;
  };
}

module.exports = { addHelpers };
