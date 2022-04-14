import {
    stringifyInString,
    parseFromString
} from './utilities.js'

export function getFromStorage (key) {
    return parseFromString(localStorage.getItem(key))
}

export function setInStorage (key, value) {
    localStorage.setItem(key, stringifyInString(value));
}