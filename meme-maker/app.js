const saveBtn = document.querySelector("#save")
const textInput = document.querySelector("#text")
const fileInput = document.querySelector("#file")
const modeBtn = document.querySelector("#mode-btn")
const destroyBtn = document.querySelector("#destroy-btn")
const eraserBtn = document.querySelector("#eraser-btn")
const colorOptions = document.querySelectorAll(".color-option")
const color = document.querySelector("#color")
const lineWidth = document.querySelector("#line-width")
const canvas = document.querySelector("canvas")

const ctx = canvas.getContext("2d")

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// 선굵기를 인풋의 레인지값과 동일하게 해줌
ctx.lineWidth = lineWidth.value;
// 라인 끝 둥글게 만들기
ctx.lineCap = "round"

// canvas 위에서 마우스를 움직일때마다 moveTo 호출 -> 마우스가 있는 곳으로 브러쉬를 움직여야함
// 클릭하면 클릭한 곳에서부터 선 그리기

let isPainting = false;
let isFilling = false;


// 마우스를 움직이고  isPainting 이 true 일때 그리기
function onMove(event){
    // isPainting 이 true면 선 그리기
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    // 같은 패스로 그려지지 않기 위해서 새로운 패스 추가
    // 이렇게 안하면 선 굵기를 변경했을때, 이전에 그려진 선굵기도 현재 지정한 선굵기로 변함
    // 마우스를 움직일 때, 새로운 path 시작
    ctx.beginPath();
    // isPainting 이 false면 브러쉬 위치만 마우스있는데로 옮기기
    ctx.moveTo(event.offsetX, event.offsetY)
}

function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
}

// 두께 변경 함수
function onLineWidthChange(event){
    // change 이벤트 값을 읽어와서 해당 값을 일치시켜줌
    ctx.lineWidth = event.target.value;
}


// 색상 변경 함수
const ColorChange = (color) =>{
    ctx.strokeStyle = color
    ctx.fillStyle = color
}

function onColorChange(event){
    // fillColor : 도형을 만들면 그 안을 채워주는 색상
    // strokeColor : 선의 색상
    ColorChange(event.target.value)
}

function onColorClick(event){
    ColorChange(event.target.dataset.color) 
    // color input의 색상 변환 
    color.value = event.target.dataset.color 
}

function onModeClick(){
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill"
    }
    else { 
        isFilling = true;
        modeBtn.innerText = "Draw"
    }
}

// 색상 채우기
function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0, CANVAS_WIDTH,CANVAS_HEIGHT)
    }
}

// 모두 지우기 함수
function onDestroyClick(){
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
}

// 지우기 함수
function onEraserClick(){
    ctx.strokeStyle = "white"
    isFilling = false;
    modeBtn.innerText = "Fill"
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file)
    const image = new Image()
    // new Image()는 HTML 에서 <img src=""/>을 쓰는것과 같다
    image.src = url
    // 이미지가 로딩되면 캔버스 안에 이미지 그리기
    image.onload = function(){
        ctx.drawImage(image, 0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
        // drawImage는 image를 필요로함
        // drawImage(이미지, x위치, y위치, width, height)
        fileInput.value = null;
    }
}

function onDoubleClick(event){
    const text = textInput.value;
    if(text !== "") {
        // save() ctx의 현재 상태, 색상, 스타일 등 모든 것을 저장
        ctx.save();
        ctx.lineWidth = 1;
        // font 두가지 상태 지정 size와 font-family
        ctx.font = "48px serif"
        //ctx.strokeText(text, event.offsetX, event.offsetY)
        ctx.fillText(text, event.offsetX, event.offsetY)
        // restore() 이전에 저장된 상태로 돌아감, save()로 저장해두었던 버전으로 되돌림
        ctx.restore();
    }
}

// 저장 기능 함수
function onSaveClick(){
    // canvas.toDataURL 캔버스에 그려진 이미지를 url로 인코딩해줌
    const url = canvas.toDataURL();
    // a태그이 download  속성을 이용해서 그려진 이미지 저장
    const a = document.createElement("a")
    a.href = url
    a.download = "myDrawing.png"
    a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting)
canvas.addEventListener("click", onCanvasClick)
// 선두꼐 및 색상 변경을 감지하기 위해서 input을 사용하고 input값의 변경을 감지하는 이벤트리스너 사용
lineWidth.addEventListener("change", onLineWidthChange)
color.addEventListener("change", onColorChange)
colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);

fileInput.addEventListener("change", onFileChange)

canvas.addEventListener("dblclick", onDoubleClick)

saveBtn.addEventListener("click", onSaveClick)


// 추가 챌린지
// 1. 폰트 및 폰트 사이즈 바꾸는 옵션 추가
// 2. 텍스트 fill/stroke  옵션 추가
// 3. 모양을 그릴 수 있는 옵션 추가 -> onMove 함수에서 stroke -> fill 로 변경
// 선과 모양중에 골라서 그릴 수 있게 하기
// 4. 
