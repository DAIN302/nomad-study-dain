const canvas = document.querySelector("canvas")

const ctx = canvas.getContext("2d")

canvas.width = 800;
canvas.height = 800;

// canvas  좌표시스템 : 왼쪽 위부터 (0,0)

// 채워진 직사각형 그리기 :  fillRect(x,y, width, height)
// ctx.fillRect(50, 100, 100, 200)

// 선으로 된 직사각형 그리기 : strokeRect
// ctx.strokeRect(200, 100, 100, 200)

// ctx.rect(50,50,100,100);
// ctx.rect(150,150,100,100);
// ctx.rect(250,250,100,100);
// // fill() 색을 채워넣음  stroke() 선만 그림
// ctx.fill();

// // 경로 분리
// ctx.beginPath();
// ctx.rect(350,350,100,100)
// ctx.rect(450,450,100,100)
// //  빨간색으로 채우기
// ctx.fillStyle = "red"; // 색을 지정하고
// ctx.fill(); // fill 을 다시 호출
// // -> 위의 세개는 검은색, 아래 하나는 빨간색

// // moveTo(x,y) -> 그려질 위치 시작점 옮기기
// ctx.moveTo(50, 50);
// // lineTo(x, y) -> 선그리기
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.stroke();
// moveTo() -> 연필 떼고 이동
// lineTo() -> 연필로 선을 그으면서 이동

// 집만들기
// 벽만들기
// ctx.fillRect(200,200,50,200);
// ctx.fillRect(400,200,50,200);
// // 선굵기 바꾸기
// ctx.lineWidth = 2;
// // 문만들기
// ctx.fillRect(300,298,50,100);
// // 천장만들기
// ctx.fillRect(200,200,200,20)
// // 지붕만들기
// ctx.moveTo(200,200)
// ctx.lineTo(325,100)
// ctx.lineTo(450,200)
// ctx.fill();

// 사람그리기
// 팔그리기
ctx.fillRect(210 -40 ,200-50,15,100)
ctx.fillRect(350 -40 ,200-50,15,100)
// 몸통그리기
ctx.fillRect(260 -40 ,200-50,60,200)
// 머리그리기 
ctx.arc(250,100,50,0,2*Math.PI);
ctx.fill();
// 눈만들기
ctx.beginPath()
ctx.fillStyle = "white"
ctx.arc(260+10,80,8,Math.PI,2*Math.PI);
ctx.arc(220+10,80,8,Math.PI,2*Math.PI);
ctx.fill()

// 입만들기
ctx.beginPath();
ctx.fillStyle = "red"
ctx.arc(250,100,20,0,1*Math.PI);
ctx.fill();




