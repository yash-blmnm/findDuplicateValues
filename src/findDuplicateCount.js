export function findDuplicateCountArray(args) {
    const uniqueItems = new Set();
    let count = 0;
    for (const value of args) {
        if (uniqueItems.has(value) && value !== "") {
            count++;
        } else {
            uniqueItems.add(value);
        }
    }
    return count;
}

export function findDuplicateCountObjects(args) {
    const uniqueItems = new Set(),
    duplicateIndex = new Set();
    let count = 0;
    for (const value in args) {
        const tempVal = JSON.stringify(args[value]);
        if (uniqueItems.has(tempVal)) {
            count++;
            duplicateIndex.add(value);
        } else {
            uniqueItems.add(tempVal);
        }
    }
    return [duplicateIndex, count];
}
