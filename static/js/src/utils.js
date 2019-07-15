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

export { round, mean, sanitize };
