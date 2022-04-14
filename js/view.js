import {
    DEFAULT_UI_ELEMENTS
} from './const.js'

import {
    getFromStorage,
    setInStorage
} from './storage.js'

function cellOnUI(cell) {
    const cellUI = document.createElement('div');

    switch (cell) {
        case ('body'): cellUI.classList.add('cell', 'body');
            break;
        case ('target'): cellUI.classList.add('cell', 'target');
            break;
        default: cellUI.classList.add('cell');
    }

    DEFAULT_UI_ELEMENTS.PLAY_FIELD.append(cellUI);
}

export function fieldOnUI(field) {
    DEFAULT_UI_ELEMENTS.PLAY_FIELD.innerHTML = '';

    field.forEach(line => line.forEach(cell => cellOnUI(cell)));
}

export function scoreCounter() {
    const currentScore = getFromStorage('score') + 10;
    setInStorage('score', currentScore);
    DEFAULT_UI_ELEMENTS.SCORE_COUNTER.textContent = currentScore;
}