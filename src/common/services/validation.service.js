export function checkIfArrayOfStringsAndNotEmpty(value) {
    return value.every((val) => typeof val === 'string' && val.length)
}

export function checkIfWordWithOneLetter(value) {
    return value.length === 1;
}
