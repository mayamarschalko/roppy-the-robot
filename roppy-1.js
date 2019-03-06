var arduino = require("./arduino");
var myArduino = arduino.addArduino();

var HappyFace = [
  "00000000",
  "01101100",
  "01100010",
  "00001010",
  "00001010",
  "01100010",
  "01101100",
  "00000000"
];

var SadFace = [
  "00000000",
  "01000011",
  "01000100",
  "00010100",
  "00010100",
  "01000100",
  "01000011",
  "00000000"
];

myArduino.when("ready", () => {
  var leftEye = arduino.addLightSensor(0);
  var rightEye = arduino.addLightSensor(1);

  var Face = arduino.addMatrix(2, 4, 3);
  Face.on();

  leftEye.when("data", value => {
    if (value > 50) {
      // BRIGHT
      speak("thank you for turning on the lights");
      Face.draw(HappyFace);
    }

    if (value < 50) {
      // dark
      speak("it's too dark in here.May you turn on the lights?");
      Face.draw(SadFace);
    }
  });

  //   rightEye.when("data", value => {
  //     write("Right eye: ", value);
  //   });
});
