export default function findDuplicateCount(args) {
    const uniqueItems = new Set();
    let count = 0;
    let [primary] = args;
    for (let i = 0; i < primary.length; i++) {
        let value = primary[i].trim();
        if(args.length > 1){
        for(let j = 1; j < args.length; j++){
            value = `${value}||${args[j][i]}`
        }
        }
        if (uniqueItems.has(value)) {
            count++;
        } else {
            uniqueItems.add(value);
        }
    }
    return count;
}