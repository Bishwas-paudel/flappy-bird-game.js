console.log("Linked")
var canvas = document.getElementById("canvas")
console.log(canvas)
canvas.style.position = 'fixed'
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var hasCollided = false;
var pipeVelocity = 1.8;
var velocity = 0;
var gravity = 0.1;
// getting drawing context
const drawer = canvas.getContext("2d")
// giving fill Color

var box = {
    top: canvas.height / 2,
    left: 400,
    width: 60,
    height: 60
};
var score = 0;
const pipeVerticalGap = 300;
const pipeHorizontalGap = 300;
const pipeWidth = 50;
var pipes = [];
// adding 4 pipes to this array
for (var i = 0; i < 8; i++) {
    pipes.push(giveMePipe());
}
setInterval(function () {
    if (hasCollided) {
        drawer.fillText("Game Over", canvas.width / 2, canvas.height / 2)
        setTimeout(function () {
            window.location.reload();
        }, 2000)
        return;
    }
    // erasing all canvas
    drawer.clearRect(0, 0, canvas.width, canvas.height)
    velocity = velocity + gravity;
    box.top = box.top + velocity;
    // mathi jana nadini
    if (box.top < 0) {
        box.top = 0;
        velocity = 0;
    }
    // Tala khasna nadini
    if (box.top > canvas.height - box.height) {
        box.top = canvas.height - box.height
        velocity = 0;
    }

    for (var i = 0; i < pipes.length; i++) {
        var pipe = pipes[i]
        //moving pipes left
        pipe.topPipe.left -= pipeVelocity
        pipe.bottomPipe.left -= pipeVelocity
        drawBox(pipe.topPipe, "green")
        drawBox(pipe.bottomPipe, "green")
        if (pipe.topPipe.left < 0) {
            // remove first pipe from array
            pipes.shift()
            // add new pipe to last of array
            pipes.push(giveMePipe())
            if (!hasCollided) {
                score++;
            }
            // console.log("Score is: " + score)
        }
        checkCollision(pipe.topPipe, box)
        checkCollision(pipe.bottomPipe, box)
    }
    // drawing Box
    drawBox(box, hasCollided ? "pink" : "red")
    // drawing Score
    drawer.fillStyle = "blue"
    drawer.font = "30px Arial"
    drawer.fillText("Score is: " + score, 50, 100)
}, 10)

window.addEventListener("keydown", function (e) {
    if (e.key == " ") {
        velocity = -6;
    }
})

function drawBox(box, color) {
    drawer.fillStyle = color
    drawer.fillRect(box.left, box.top, box.width, box.height)
}

function giveMePipe() {
    var topPipeHeight = giveMeRandomHeight(20, canvas.height - pipeVerticalGap);
    var leftOffset = box.left + 300;
    //pipes array empty xa vane
    if (pipes.length == 0) {
        // leftOffset change garna parena
    } else {
        var lastPipe = pipes[pipes.length - 1]
        leftOffset = lastPipe.topPipe.left + pipeHorizontalGap;
    }

    return {
        topPipe: {
            top: 0,
            left: leftOffset,
            width: pipeWidth,
            height: topPipeHeight
        },
        bottomPipe: {
            top: topPipeHeight + pipeVerticalGap,
            left: leftOffset,
            width: 50,
            height: canvas.height - topPipeHeight - pipeVerticalGap,
        }
    };

}

function giveMeRandomHeight(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function checkCollision(box1, box2) {

    if (box1.left < box2.left + box2.width &&
        box1.left + box1.width > box2.left &&
        box1.top < box2.top + box2.height &&
        box1.height + box1.top > box2.top) {
        hasCollided = true;
    }

}

