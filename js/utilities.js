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

    for (let element of currentSnakeBody) {
        if (compareCoordinates(element, newTarget)) {
            return generateTarget();
        }
    }

    return newTarget;
}

function randomCoordinate() {
    const coordinate = Math.floor(Math.random() * 10);
    return (coordinate === 10) ? randomCoordinate() : coordinate;
}

export function changeDirection(event) {
    const currentDirection = getFromStorage('direction');
    switch (event.code) {
        case ('KeyD'): if (currentDirection !== 'left') setInStorage('direction', 'right');
            break;
        case ('KeyS'): if (currentDirection !== 'up') setInStorage('direction', 'bottom');
            break;
        case ('KeyA'): if (currentDirection !== 'right') setInStorage('direction', 'left');
            break;
        case ('KeyW'): if (currentDirection !== 'bottom') setInStorage('direction', 'up');
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