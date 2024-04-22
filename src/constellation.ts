const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")!;

type TStar = {
    x: number,
    y: number,
    r: number,
    color: string,
    sx: number,
    sy: number,
}

type TMouse = {
    x: number,
    y: number,
}

const numberOfStars = (width: number) => {
    if (width > 1500) {
        return 250
    } else if (width > 1000) {
        return 200
    } else if (width > 500) {
        return 150
    } else if (width > 200) {
        return 50
    }
}

const headerBoundary = (width: number) => {
    if (width > 1000) {
        return 120
    } else if (width > 200) {
        return 90
    }
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseP: TMouse = {x: 0, y: 0}

const stars = new Array(numberOfStars(screen.width)).fill(0).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 0.9,
    color: '#808188',
    sx: 0.1 - (Math.random() * 0.5),
    sy: 0.1 - (Math.random() * 0.5),
}));

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2, false);
        ctx.fill();
    });
}

function animate() {
    stars.forEach((star) => {
        star.x += star.sx;
        star.y += star.sy;

        if (star.x < star.r || star.x > canvas.width - star.r) {
            star.sx = -star.sx
        }

        if (star.y < star.r || star.y > canvas.height - star.r) {
            star.sy = -star.sy
        }
    });

    drawStars();
    detectStars(mouseP)

    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

const pythagoras = (firstPoint: TStar | TMouse, secondPoint: TStar) => {
    const xd = Math.abs(firstPoint.x - secondPoint.x)
    const yd = Math.abs(firstPoint.y - secondPoint.y)
    return Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2))
}

const detectLines = (nearStars: Array<TStar>) => {
    for (let i = 0; i < nearStars.length; i++) {
        for (let j = 1; j < nearStars.length - 1; j++) {
            const diff = pythagoras(nearStars[i], nearStars[j])

            if (diff < 150) {
                ctx.beginPath()
                ctx.moveTo(nearStars[i].x, nearStars[i].y)
                ctx.lineTo(nearStars[j].x, nearStars[j].y)
                ctx.strokeStyle = 'rgba(255, 0, 180, .5)'
                ctx.stroke()
                ctx.closePath()
            }
        }
    }
}

const detectStars = (mouse: TMouse) => {
    const nearStars: Array<TStar> = []
    stars.forEach((star) => {
        const diff = pythagoras(mouse, star)

        if (diff < 150 && star.y > headerBoundary(screen.width)!) {
            nearStars.push(star)
        }
    })

    detectLines(nearStars)
}


canvas.addEventListener("mousemove", (e: MouseEvent) => {
    mouseP = {x: e.pageX, y: e.pageY}

    detectStars(mouseP)
});