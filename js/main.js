import {
    DEFAULT_UI_ELEMENTS,
    DEFAULT_SNAKE_BODY,
    DEFAULT_SCORE,
    DEFAULT_DIRECTION
} from './const.js'

import {
    generateTarget,
    changeDirection,
    generateEmptyField,
    compareCoordinates
} from './utilities.js'

import {
    getFromStorage,
    setInStorage
} from './storage.js'

import {
    fieldOnUI,
    scoreCounter
} from './view.js'

function setDefaultSetup() {
    setInStorage('snakeBody', DEFAULT_SNAKE_BODY);
    setInStorage('target', generateTarget());
    setInStorage('score', DEFAULT_SCORE);
    setInStorage('direction', DEFAULT_DIRECTION);
}

setDefaultSetup();

DEFAULT_UI_ELEMENTS.START_BUTTON.addEventListener('click', playGame);
document.body.addEventListener('keydown', changeDirection);

function playGame() {
    snakeMove();
    const playField = fillTheField();
    fieldOnUI(playField);

    setTimeout(playGame, 500);
}

function fillTheField() {
    const field = generateEmptyField();
    const currentSnakeBody = getFromStorage('snakeBody');
    const currentTarget = getFromStorage('target');

    field[currentTarget[0]][currentTarget[1]] = 'target';
    currentSnakeBody.forEach(element => field[element[0]][element[1]] = 'body');

    return field;
}

function snakeMove() {
    const snakeBody = getFromStorage('snakeBody');
    const currentTarget = getFromStorage('target');
    const currentDirection = getFromStorage('direction');

    const nextHead = [snakeBody[snakeBody.length - 1][0], snakeBody[snakeBody.length - 1][1]];

    switch (currentDirection) {
        case ('right'): nextHead[1]++
            break;
        case ('bottom'): nextHead[0]++
            break;
        case ('left'): nextHead[1]--
            break;
        default: nextHead[0]--
    }

    const nextHeadInBody = snakeBody.includes(nextHead);

    if (nextHeadInBody) {
        return 'Game Over';
    }

    snakeBody.push(nextHead);

    const targetReach = compareCoordinates(nextHead, currentTarget);

    if (targetReach) {
        scoreCounter();
        setInStorage('target', generateTarget());
    } else {
        snakeBody.splice(0, 1);        
    }

    setInStorage('snakeBody', snakeBody);
}