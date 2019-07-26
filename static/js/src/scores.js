/* eslint-disable scanjs-rules/identifier_localStorage */
function scores() {
    /* Display Results to Users */
    $('.domain-results').each(function(idx, domainResults){
        var resultsContainer = $(domainResults).find('tbody').first();
        var currentDomain = domainResults.id;

        [...Array(3).keys()].map((el) => {
            var q = el + 1;
            var prefix = currentDomain + '-' + q;
            var preScore = localStorage.getItem(prefix + '-pre-q1');
            var postScore = localStorage.getItem(prefix + '-post-q1');

            if (preScore && postScore) {
                preScore = Number(preScore);
                postScore = Number(postScore);

                var learningObjectiveScore = postScore - preScore;
                var tableRow = $('<tr id="' + prefix + '"></tr>');
                tableRow.html(
                    /* eslint-disable-next-line max-len */
                    '<td id="' + prefix +'-l-obj-title"><a href="' + localStorage.getItem(prefix + '-url') + '">' +
                    localStorage.getItem(prefix) + '</a>' +
                    /* eslint-disable-next-line max-len */
                    '<td id="' + prefix +'-l-obj-pre-score">' + preScore + '</td>' +
                    /* eslint-disable-next-line max-len */
                    '<td id="' + prefix +'-l-obj-post-score">' + postScore + '</td>' +
                    /* eslint-disable-next-line max-len */
                    '<td id="' + prefix +'-l-obj-score-diff">' + learningObjectiveScore + '</td>');
                resultsContainer.append(tableRow[0]);

                // Unhide the scores if any questions are answered
                $('#review-no-score').hide();
                $('#review-score-container').show();

                // Unhide the parent container if there's at least one
                // question answered.
                $('#' + (idx + 1)).show();
                $('#domain-score-' + (idx + 1)).show();
                $('#domain-title-' + (idx + 1)).show();
            }
        });
    });
}

export { scores };
