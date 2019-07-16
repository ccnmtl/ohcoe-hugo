/* eslint-disable scanjs-rules/identifier_localStorage */
import {
    round, mean, sliceScore, applySlicedScore
} from './utils.js';

function progressBars() {
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
                'Pre-Assessment Score: ' + meanPreScore);
            $('#domain-post-diff').append(
                'Post-Assessment Score: ' + meanPostScore);
        }
    });

    // Cumulative Progress Bar
    if (document.getElementById('cumulative-review')
        && cumulativePreScore.length && cumulativePostScore.length) {
        var meanPreScore = round(mean(cumulativePreScore));
        var meanPostScore = round(mean(cumulativePostScore));
        var meanPrePct = (meanPreScore / 4) * 100;
        var meanPostPct = (meanPostScore / 4) * 100;

        var preScorePBar = $('#cumulative-pre-score')[0];
        preScorePBar.style.width = meanPrePct + '%';
        $('#cumulative-pre-score').attr('aria-valuenow', meanPreScore);
        preScorePBar.append(meanPreScore + ' / 4');

        var postScorePBar = $('#cumulative-post-score')[0];
        postScorePBar.style.width = meanPostPct + '%';
        $('#cumulative-post-score').attr('aria-valuenow', meanPostScore);
        postScorePBar.append(meanPostScore + ' / 4');

        $('#cumulative-growth-diff').append(
            '<div>You grew ' + round(meanPostScore - meanPreScore) +
            ' confidence intervals.</div>');
    }
}

export { progressBars };
