// Game constants and variables

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.wav');
const gameOverSound = new Audio('gameOver.wav');
const musicSound = new Audio('music.mp3');
const moveSound = new Audio('move.wav');
let speed = 10;
let score = 0;
let finalscore = 0;
let level = 1;
let specialCollected = 0;
let lastPaintTime = 0;
let snakeArr = [ 
    { x: 13, y: 15 }
];
let food = { x: 2, y: 9 }
let specialFood = {x:10, y:11};

//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}

function isCollide(snake) {
    //If you collide with urself
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y===snake[0].y) {
            return true;
        }
    }

    //iF YOU BUMP INTO WALL
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0) {
        return true;
    }

    return false;

}

function gameEngine() {
    //Updating Snake array
    if(isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over! Press any key to play again.");
        snakeArr = [{x: 13 , y: 15}];
        musicSound.play();
        specialFood = {x:-1, y:-1};
        speed=10;
        level=1;
        score=0;
        finalscore = 0;
        specialCollected=0;
        scoreBox.innerHTML = "Score: "+ finalscore;

    }

    //After eating food 
    if(snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodSound.play();
        score+=1;
        finalscore+=1;
        if(finalscore> hiscoreval ) {
            hiscoreval = finalscore;
            localStorage.setItem('hiscore', JSON.stringify(finalscore));
            HiScoreBox.innerHTML = "HiScore: "+ hiscoreval;
        }
        if(score%5==0) {
            level++;
        }
        speed = 10 + level*2;
        scoreBox.innerHTML = "Score: "+ finalscore;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x : Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        if(specialCollected<2) {
            specialCollected += 1;
        }

    }

    //After eating special food
    if(snakeArr[0].y == specialFood.y && snakeArr[0].x == specialFood.x) {
        foodSound.play();
        finalscore+=3;
        if(finalscore> hiscoreval ) {
            hiscoreval = finalscore;
            localStorage.setItem('hiscore', JSON.stringify(finalscore));
            HiScoreBox.innerHTML = "HiScore: "+ hiscoreval;
        }
        scoreBox.innerHTML = "Score: "+ finalscore;
        // snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        if(specialCollected==2) { 
            let a = 1;
            let b = 17;
            specialFood = {x : Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        }
        else {
            specialFood = {x:-1 , y:-1};
        }
        specialCollected=0;
    }


    //Moving the snake
    for (let i = snakeArr.length - 2; i >=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Display Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });


    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    //Displaying Special food
    if(score>0 && specialCollected==2) {
        specialFoodElement = document.createElement('div');
        specialFoodElement.style.gridRowStart = specialFood.y;
        specialFoodElement.style.gridColumnStart = specialFood.x;
        specialFoodElement.classList.add('special')
        board.append(specialFoodElement);
        
    }

}


//Main Logic
musicSound.play();

let hiscore = localStorage.getItem('hiscore');
if(hiscore == null) {
    hiscoreval = 0 ;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else{ 
    hiscoreval = JSON.parse(hiscore)
    HiScoreBox.innerHTML = "HiScore: "+ hiscoreval;
}
    


window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: -1 }; //Start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;

            break;
        case "ArrowDown":
            console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;

    }

})
