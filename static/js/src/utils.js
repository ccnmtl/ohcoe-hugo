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

function setHeartValue(id, val) {
    var offset = Math.trunc(val * 100);
    $('#heart-fill-' + id + '-red')[0].setAttribute('offset', offset + '%');
    $('#heart-fill-' + id + '-gray')[0].setAttribute('offset', offset + '%');
}

export { round, mean, sanitize, setHeartValue };
