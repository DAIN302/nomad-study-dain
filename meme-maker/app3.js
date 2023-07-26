const canvas = document.querySelector("canvas")

const ctx = canvas.getContext("2d")

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;

const colors = [
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
    "#18dcff",
    "#7d5fff"
]

function onClick(event){
    // console.log(event.offsetX, event.offsetY);
    let rx, ry;
    rx = Math.floor(Math.random()*800)
    ry = Math.floor(Math.random()*800)
    ctx.beginPath();
    // 브러쉬 위치 랜덤
    ctx.moveTo(rx,ry);
    // 컬러 랜덤
    const color = colors[Math.floor(Math.random()*colors.length)]
    ctx.strokeStyle = color;
    // 클릭한 곳까지 선 그리기
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

// 클릭할때마다 캔버스 위에 선 그려지게 하기
canvas.addEventListener("click", onClick)




