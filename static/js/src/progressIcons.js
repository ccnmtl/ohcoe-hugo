import {
    round, mean, sliceScore, applySlicedScore
} from './utils.js';

function progressIcons() {
    /* Render the progress bars for users */
    var cumulativePreScore = new Array();
    var cumulativePostScore = new Array();

    $('.domain-results').each(function(idx, domainResults){
        var currentDomain = domainResults.id;
        var domainPreScore = new Array();
        var domainPostScore = new Array();

        [...Array(3).keys()].map((el) => {
            var q = el + 1;
            var prefix = currentDomain + '-' + q;
            var preScore = localStorage.getItem(prefix + '-pre-q1');
            var postScore = localStorage.getItem(prefix + '-post-q1');

            if (preScore && postScore) {
                preScore = Number(preScore);
                postScore = Number(postScore);

                domainPreScore.push(preScore);
                domainPostScore.push(postScore);
                cumulativePreScore.push(preScore);
                cumulativePostScore.push(postScore);
            }
        });

        // Domain Progress Bar
        if (document.getElementById('domain-review')
            && domainPreScore.length && domainPostScore.length) {
            var meanPreScore = round(mean(domainPreScore));
            var meanPostScore = round(mean(domainPostScore));

            // "slice" a score into 4 parts
            // Then map over that array and set the Heart values
            sliceScore(meanPreScore).map(applySlicedScore, 'pre-');
            sliceScore(meanPostScore).map(applySlicedScore, 'post-');

            $('#domain-pre-diff').append(
                '<div>Pre-Assessment Score: ' + meanPreScore + '</div>');
            $('#domain-post-diff').append(
                '<div>Post-Assessment Score: ' + meanPostScore + '</div>');
        }
    });

    // Cumulative Progress Bar
    if (document.getElementById('cumulative-review')
        && cumulativePreScore.length && cumulativePostScore.length) {
        var meanPreScore = round(mean(cumulativePreScore));
        var meanPostScore = round(mean(cumulativePostScore));

        sliceScore(meanPreScore).map(applySlicedScore, 'pre-');
        sliceScore(meanPostScore).map(applySlicedScore, 'post-');

        $('#cumulative-pre-diff').append(
            'Pre-Assessment Score: ' + meanPreScore);
        $('#cumulative-post-diff').append(
            'Post-Assessment Score: ' + meanPostScore);
    }
}

export { progressIcons };
