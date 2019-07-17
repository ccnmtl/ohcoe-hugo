function round(val){
    return Math.round(val * 100) / 100;
}

function mean(arr){
    return arr.reduce(function(acc, val){
        return acc + val;
    }) / arr.length;
}

function sanitize(s) {
    // http://shebang.brandonmintern.com/foolproof-html-escaping-in-javascript/
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

function sliceScore(score) {
    // This function 'slices' off increments one at a time, and appends the
    // difference to an array.
    // For example: 2.3 would return [1, 1, 0.3, 0]

    // Multiply by 100 to avoid rounding imprecision of floats
    // setHeartValue takes percentages
    var roundedScore = score * 100;
    return [...Array(4).keys()].reduce(function(acc, idx) {
        var heartValue = roundedScore > 100 ? 100 : roundedScore;
        if (roundedScore >= 0 && roundedScore < 100) {
            roundedScore = 0;
        } else {
            roundedScore -= 100;
        }
        acc.push(heartValue);
        return acc;
    }, []);
}

function setHeartValue(id, val) {
    $('#heart-fill-' + id + '-red')[0].setAttribute('offset', val + '%');
    $('#heart-fill-' + id + '-gray')[0].setAttribute('offset', val + '%');
}

function applySlicedScore(val, idx) {
    setHeartValue(this + idx, val);
}

export { round, mean, sanitize, setHeartValue, sliceScore, applySlicedScore};
