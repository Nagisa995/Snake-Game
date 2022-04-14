import {
    getFromStorage,
    setInStorage
} from './storage.js'

export function generateEmptyField() {
    const newField = []
    for (let i = 0; i < 10; i++) {
        newField[i] = [];
        for (let j = 0; j < 10; j++) {
            newField[i][j] = 0;
        }
    }
    return newField;
}

export function stringifyInString(element) {
    return JSON.stringify(element);
}

export function parseFromString(element) {
    return JSON.parse(element);
}

export function generateTarget() {
    const newTarget = [randomCoordinate(), randomCoordinate()];
    const currentSnakeBody = getFromStorage('snakeBody');

    const targetIsNotValid = currentSnakeBody.includes(newTarget);
    if (targetIsNotValid) {
        return generateTarget();
    }

    return newTarget;
}

function randomCoordinate() {
    const coordinate = Math.floor(Math.random() * 10);
    return (coordinate === 10) ? randomCoordinate() : coordinate;
}

export function changeDirection(event) {
    switch (event.code) {
        case ('KeyD'): setInStorage('direction', 'right')
            break;
        case ('KeyS'): setInStorage('direction', 'bottom')
            break;
        case ('KeyA'): setInStorage('direction', 'left')
            break;
        case ('KeyW'): setInStorage('direction', 'up')
            break;
        default: return;
    }
}

export function coordinateIsNotValid(coordinate) {
    return (coordinate == 9 || coordinate == 0) ? true : false
}

export function compareCoordinates(first, second) {
    return stringifyInString(first) == stringifyInString(second);
}