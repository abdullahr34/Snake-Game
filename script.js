const border = 'black';
const background = 'lightgrey';
const snake_Colour = 'darkgrey';
const snake_border = 'darkgrey';

function drawSnakePart(snakePart){
    snakeboard_ctx.fillStyle = snake_Colour;
    snakeboard_ctx.strokeStyle = 'black';
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10,10);
}

function drawSnake(){
    snake.forEach(drawSnakePart);
}

function clearCanvas(){
    snakeboard_ctx.fillStyle = background;
    snakeboard_ctx.strokeStyle = border;
    snakeboard_ctx.fillRect(0,0,snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0,0,snakeboard.width, snakeboard.height);
}

function main(){

    if(game_end() === true) {
        return;
    }

    changing_direction = false; 

    setTimeout(function onTick(){
        clearCanvas();
        draw_Food();
        snake_Movement();
        drawSnake();
        main();
    }, 100)
}
let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200},
    
]

const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");

let food_x;
let food_y;
let score = 0;
let changing_direction = false;
let dx = 10;
let dy = 0;

function snake_Movement(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if(snake[0].x === food_x && snake[0].y === food_y){
        score+=10;
        document.getElementById('score').innerHTML = score;
        generate_Food();
    } else {
        snake.pop();
    }
}

function change_Direction(event){

    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if(changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingLeft = dx === -10;
    const goingRight = dx === 10;

    if(keyPressed === LEFT_KEY && !goingRight){
        dx = -10;
        dy = 0;
    }

    if(keyPressed === RIGHT_KEY && !goingLeft){
        dx = 10;
        dy = 0;
    }
    if(keyPressed === UP_KEY && !goingDown){
        dx = 0;
        dy = -10;
    }
    if(keyPressed === DOWN_KEY && !goingUp){
        dx = 0;
        dy = 10;
    }
}

function random_food(min,max){
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function generate_Food(){
    food_x = random_food(0, snakeboard.width - 10);
    food_y = random_food(0, snakeboard.height - 10);
    snake.forEach(function has_Eaten(part){
        const eaten = part.x == food_x && part.y == food_y;
        if(eaten) generate_Food();
    });
}

function draw_Food(){
    snakeboard_ctx.fillStyle = 'red';
    snakeboard_ctx.strokeStyle = 'red';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}
function game_end(){
    for(let i = 4; i< snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
            
    }

    const hitLeft = snake[0].x < 0;
    const hitRight = snake[0].x > snakeboard.width - 10;
    const hitUp = snake[0].y < 0;
    const hitBottom = snake[0].y > snakeboard.height - 10;

    return hitLeft || hitRight || hitUp || hitBottom;
}

document.addEventListener("keydown", change_Direction);
main();
generate_Food();