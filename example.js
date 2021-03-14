function roundToNearest(target, value) {
    let multiplier = value / target;
    let temp = value - (Math.round(multiplier) * target);
    return value - temp;
}

console.log(roundToNearest(64, 247));