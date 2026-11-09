// 핸드폰 센서값 받아오기
// ⚠️ https 주소(GitHub Pages)에서 핸드폰으로 열어야 작동함
// 아이폰: [센서 켜기] 버튼을 눌러 권한을 허용해야 함 / 안드로이드: 바로 작동

let btn;
let hue = 0; // 흔들 때마다 바뀌는 배경색

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES); // 기울기 값을 '도' 단위로 받기 (기본은 라디안)

  btn = createButton("센서 켜기");
  btn.position(20, height - 80);
  btn.size(150, 50);
  btn.mousePressed(askPermission);
}

// 아이폰은 사용자가 버튼을 눌러야 센서 권한을 요청할 수 있음
// (p5에 이 기능이 없어서 자바스크립트 코드를 그대로 씀. 건드리지 않아도 되는 부분)
function askPermission() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission();
    DeviceOrientationEvent.requestPermission();
  }
  btn.hide();
}

function draw() {
  background(hue, 30, 100);

  // 1. 가속도: 핸드폰을 '움직이는' 세기. 가만히 있으면 0 근처
  let move = abs(accelerationX) + abs(accelerationY) + abs(accelerationZ);

  // 2. 기울기: 핸드폰이 '기울어진' 각도
  //    rotationX: 앞뒤로 기울이기 / rotationY: 좌우로 기울이기 / rotationZ: 나침반처럼 돌리기
  let x = map(rotationY, -45, 45, 0, width, true); // 좌우로 기울이면 좌우로
  let y = map(rotationX, -45, 45, 0, height, true); // 앞뒤로 기울이면 위아래로

  // 기울기로 위치, 움직임으로 크기
  noStroke();
  fill(0, 0, 0);
  circle(x, y, 50 + move * 3);

  // 값 보기
  fill(0, 0, 0);
  textSize(20);
  text("accelerationX: " + round(accelerationX, 1), 20, 40);
  text("accelerationY: " + round(accelerationY, 1), 20, 70);
  text("accelerationZ: " + round(accelerationZ, 1), 20, 100);
  text("rotationX: " + round(rotationX), 20, 140);
  text("rotationY: " + round(rotationY), 20, 170);
  text("rotationZ: " + round(rotationZ), 20, 200);
}

// 3. 흔들었을 때 자동으로 불리는 함수
function deviceShaken() {
  hue = random(360);
}
