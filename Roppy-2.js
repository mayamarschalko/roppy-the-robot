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
  var leftArm = arduino.addServo(8);
  var rightArm = arduino.addServo(9);
  leftArm.to(90);
  rightArm.to(90);

  var Face = arduino.addMatrix(2, 4, 3);
  Face.on();
  Face.draw(SadFace);

  speak("can i be your friend?");

  var TimesSeen = 0;

  var eye = arduino.addMotionSensor(13);

  eye.when("motionstart", () => {
    speak("hello what shoud we play");
    Face.draw(HappyFace);
    TimesSeen += 1;
    write("i saw you " + TimesSeen + " times today");

    repeat(5, 1, () => {
      rightArm.to(45);

      wait(0.5, () => {
        rightArm.to(90);
      });
    });
  });

  eye.when("motionend", () => {
    Face.draw(SadFace);
    speak("bye");
    leftArm.to(90);
    rightArm.to(90);
  });
});
