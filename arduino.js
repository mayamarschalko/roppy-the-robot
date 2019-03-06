const five = require("johnny-five");
const helpers = require("./helpers");

helpers.addHelpers();

let board;

const arduino = {
  addArduino() {
    board = new five.Board({ repl: true });
    board.when = board.on;
    return board;
  },
  addButton(pin) {
    const button = new five.Button(pin);
    button.when = button.on;
    return button;
  },
  addLed(pin) {
    const led = new five.Led(pin);
    led.lightness = value => {
      led.brightness(value * 25.5);
    };
    return led;
  },
  addSensor(pin) {
    const sensor = new five.Sensor({
      pin: "A" + pin,
      freq: 6000
    });
    sensor.when = sensor.on;
    return sensor;
  },
  addLightSensor(pin) {
    return this.addSensor(pin);
  },
  addMotionSensor(pin) {
    const motion = new five.Motion(pin);
    motion.when = motion.on;
    return motion;
  },
  addMatrix(data, cs, clock) {
    return new five.Led.Matrix({ pins: { data, cs, clock } });
  },
  addMotor(pwm, d, cd) {
    const motor = {};
    const dir = new five.Pin(d);
    const cdir = new five.Pin(cd);
    let resetTimer = null;

    board.pinMode(pwm, five.Pin.PWM);

    motor.goForward = speed => {
      dir.low();
      cdir.high();
      board.analogWrite(pwm, speed * 25.5);
    };

    motor.goBackward = speed => {
      dir.high();
      cdir.low();
      board.analogWrite(pwm, speed * 25.5);
    };

    motor.moveForward = (speed, duration) => {
      motor.goForward(speed);
      resetTimer = setTimeout(motor.stop, duration);
    };

    motor.moveBackward = (speed, duration) => {
      motor.goBackward(speed);
      resetTimer = setTimeout(motor.stop, duration);
    };

    motor.stop = () => {
      board.pinMode(pwm, five.Pin.PWM);
      board.analogWrite(pwm, 0);
    };

    return motor;
  },
  addSimpleServo(d, cd) {
    const motor = {};
    const dir = new five.Pin(d);
    const cdir = new five.Pin(cd);
    let resetTimer = null;

    motor.goUp = () => {
      dir.low();
      cdir.high();
    };

    motor.goDown = () => {
      dir.high();
      cdir.low();
    };

    motor.goLeft = () => {
      dir.low();
      cdir.high();
    };

    motor.goRight = () => {
      dir.high();
      cdir.low();
    };

    motor.moveUp = speed => {
      motor.goUp(speed);
      resetTimer = setTimeout(motor.stop, 1000);
    };

    motor.moveDown = speed => {
      motor.goDown(speed);
      resetTimer = setTimeout(motor.stop, 1000);
    };

    motor.moveLeft = speed => {
      motor.goLeft(speed);
      resetTimer = setTimeout(motor.stop, 1000);
    };

    motor.moveRight = speed => {
      motor.goRight(speed);
      resetTimer = setTimeout(motor.stop, 1000);
    };

    motor.stop = () => {
      dir.low();
      cdir.low();
    };

    return motor;
  },

  addServo(pin) {
    const servo = new five.Servo(pin);
    return servo;
  }
};

module.exports = arduino;
