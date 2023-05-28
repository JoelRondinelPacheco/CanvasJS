const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas.height)
console.log(innerWidth)

var particlesArray;

var mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove',
    function (e) {
        mouse.x = e.x;
        mouse.y = e.y;
    })

//Particula
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#8C5523';
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // COLISSION DETECTION
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    var numberParticles = Math.floor((canvas.height * canvas.width) / 9000) * 3;
    console.log(numberParticles)
    for (let i = 0; i < numberParticles; i++) {
        var size = (Math.random() * 5 + 1);
        var x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
        var y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
        var directionX = (Math.random() * 5) - 2.5;
        var directionY = (Math.random() * 5) - 2.5;
        var color = '#8c5523';
        console.log(y)
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }

    console.log(particlesArray.length)
}

function connect() {
    var opacity = 1;
    for (var a = 0; a < particlesArray.length; a++) {
        for (var b = a; b < particlesArray.length; b++) {
            var distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y);

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacity = 1 - (distance / 20000)
                ctx.strokeStyle = 'rgba(140, 85, 31,' + opacity + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.width / 80));
    init();
})



init();
animate();