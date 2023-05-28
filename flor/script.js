const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//IMPORTANTE
ctx.globalCompositeOperation = 'destination-over'

let number = 0;
let scale = 10;
var hu = Math.random() * 360;

function drawFlower() {
    let angle = number * 3.9;
    let radius = scale * Math.sqrt(number * 0.3);
    let positionX = radius * Math.sin(angle) + canvas.width / 2;
    let positionY = radius * Math.cos(angle) + canvas.height / 2;

    ctx.fillStyle = 'hsl(' + hu + ', 100%, 50%)';
    ctx.strokeStyle = 'pink';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(positionX, positionY, number, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    number++;
    hu += 1;
}


function animateCircle() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawFlower();
    if (number > 380) return;
    requestAnimationFrame(animateCircle);
}

animateCircle();
