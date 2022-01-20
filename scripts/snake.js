

let gridX = 30;
let gridY = 30;
let grid = [];

let xdir = 0;
let ydir = 0;


let x = 15;
let y = 15;
let pause = false;
let score = 0;
let highscore = 0;

document.addEventListener("keydown", getDirection);

class SnakeObj{
    
    constructor(r, c, t) {
        this.timeDelete(r, c, t);
        this.r = r;
        this.c = c;
        
    }
    timeDelete(r, c, t) {
        colorSq(r, c);
        setTimeout(function name() {
            if (!pause) {
                clearSq(r, c);
            }
        }, t);
        
    }
}


updateScore();
fillGrid();
fillMat();

placeApple();

let snake = [];
let length = 1;
snake.push(new SnakeObj(x, y))

update();
function update() {
    
    moveOne();
    
    x += xdir;
    y += ydir;
    getNextTile(x, y);
    snake.push(new SnakeObj(x, y, length * 100));
    
    if(!pause)
        setTimeout(update, 100);

}
function moveOne() {
    if (y <= 0 && ydir ==-1) {
        togglePause();
    }
    else if (y >= 29 && ydir ==1) {
        togglePause();
    }

    if (x <= 0 && xdir ==-1) {
        togglePause();
    }
    else if (x >= 29 && xdir ==1) {
        togglePause();
    }
}
function placeApple() {
    var ar = Math.floor(Math.random() * 30);
    var ac = Math.floor(Math.random() * 30);

    if ($(grid[ac][ar]).css("background-color") != "rgb(0, 0, 255)") {
        colorSq(ar, ac, "red");
    }
    else {
        placeApple();
    }
    
}

function getDirection(e) {
    if (!pause) {
        if (e.code == "ArrowUp" && ydir!=1) {
            xdir = 0;
            ydir = -1;
        
        }
        else if (e.code == "ArrowRight" && xdir!=-1) {
            xdir = 1;
            ydir = 0;
        }
        else if (e.code == "ArrowLeft" && xdir!=1) {
            xdir = -1;
            ydir = 0;
        }
        else if (e.code == "ArrowDown" && ydir!=-1) {
            xdir = 0;
            ydir = 1;
        }
    }
    if (e.code == "Space") {
        if (pause) {
            clearSnake();
            pause = false;
            snake = [];
            length = 1;
            snake.push(new SnakeObj(x, y));
            update();
            x = 15;
            y = 15;
            xdir = 0;
            ydir = 0;
            score = 0;
            $(".tile").css("opacity", "1");
        }
    }
    
    
    
}
function getNextTile(c, r) {

    if ($(grid[r][c]).css("background-color") == "rgb(0, 0, 255)") {
        if (xdir != 0 || ydir != 0) {
            console.log("hit");
            togglePause();
        }
    }
    else if ($(grid[r][c]).css("background-color") == "rgb(255, 0, 0)") {
        length++;
        score++;
        setTimeout(placeApple, 2000);
    }
}
function updateScore() {
    document.getElementById("score").textContent = "Score: " + ("" + score);
    if (score > highscore)
        highscore = score;
    document.getElementById("highscore").textContent = "High Score: " + ("" + highscore);
    setTimeout(updateScore, 100);
}
function togglePause() {
    if (!pause) {
        pause = true;
        xdir = 0;
        ydir = 0;
        $(".tile").css("opacity", ".5");
    }
    
}
function fillGrid() {
    for (var i = 0; i < (gridX * gridY) - 1; i++){
        var t = $(".tile").first().clone();
        t.appendTo("#grid");
    }
}

function fillMat() {
    for (var r = 0; r < gridX; r++){
        let rowArr = [];
        for (var c = 0; c < gridY; c++){
            rowArr.push($(".tile")[(30 * r) + c]);
            $(".tile")[(30 * r) + c].setAttribute("row", r + "");
            $(".tile")[(30 * r) + c].setAttribute("col", c + "");
        }
        grid.push(rowArr);
    }
}
function colorSq(c, r, color = "blue") {
    $(grid[r][c]).css("background-color", color);
}
function clearSq(c, r) {
    $(grid[r][c]).css("background-color", "darkslategrey");
}
function clearGrid() {
    for (var r = 0; r < 30; r++){
        for (var c = 0; c < 30; c++){
            $(grid[r][c]).css("background-color", "darkslategrey")
        }
    }
}
function clearSnake() {
    for (var r = 0; r < 30; r++){
        for (var c = 0; c < 30; c++){
            if ($(grid[r][c]).css("background-color") == "rgb(0, 0, 255)") {
                $(grid[r][c]).css("background-color", "darkslategrey");
            }
        }
    }
}