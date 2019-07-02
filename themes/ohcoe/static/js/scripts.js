/* eslint-disable scanjs-rules/identifier_localStorage */
$(function() {
    /* Utility Methods */
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

    /* Get and Set Values from Local Storage */
    // Give ids to each learning objective
    var learningObectiveTitle = document.querySelector(
        '#assessment-page-title');
    if (learningObectiveTitle) {
        localStorage.setItem(learningObectiveTitle.dataset.domainid,
            learningObectiveTitle.dataset.learningObjective);
        localStorage.setItem(learningObectiveTitle.dataset.domainid + '-url',
            learningObectiveTitle.dataset.learningObjectiveUrl);
    }

    // Get values for questions, if they've been answered by the user
    var assessmentQuestions = document.querySelectorAll('.assessment-question');
    assessmentQuestions.forEach(function(el){
        var val = localStorage.getItem(el.name);
        if (val && el.value === val) {
            el.checked = true;
        }

        // Set values for questions
        $(el).on('change', function(e){
            localStorage.setItem(el.name, e.target.value);
        });
    });

    // Clear data
    $('#storage-reset').on('click', function(e){
        localStorage.clear();
        location.reload(true);
    });

    /* Display Results to Users */
    var resultsContainer = $('.domain-results tbody');
    var cumulativePreScore = new Array();
    var cumulativePostScore = new Array();
    $('.domain-results').each(function(idx, domainResults){
        var currentDomain = null;
        if (domainResults) {
            currentDomain = domainResults.id;
        }
        var domainScore = 0;
        var learningObjectiveCounter = 0;

        [...Array(3).keys()].map((el) => {
            var q = el + 1;
            var prefix = currentDomain + '-' + q;
            var preScore = localStorage.getItem(prefix + '-pre-q1');
            var postScore = localStorage.getItem(prefix + '-post-q1');
            var learningObjectiveScore = Number(postScore) - Number(preScore);
            if (preScore && postScore) {
                var tableRow = $('<tr></tr>');
                tableRow.html(
                    /* eslint-disable-next-line max-len */
                    '<td><a href="' + localStorage.getItem(prefix + '-url') + '">' +
                    localStorage.getItem(prefix) + '</a>' +
                    /* eslint-disable-next-line max-len */
                    '<a href="' + localStorage.getItem(prefix + '-url') + '" class="btn btn-success btn-sm">' +
                    'Review Learning Objective</a>' +
                    '</td>' +
                    '<td>' + preScore + '</td>' +
                    '<td>' + postScore + '</td>' +
                    '<td>' + learningObjectiveScore + '</td>');
                resultsContainer[idx].append(tableRow[0]);
                domainScore += learningObjectiveScore;
                learningObjectiveCounter += 1;
                cumulativePreScore.push(Number(preScore));
                cumulativePostScore.push(Number(postScore));
                // Unhide the parent contains if there's at least one question
                // answered.
                $('#' + (idx + 1)).show();
                $('#domain-score-' + (idx + 1)).show();
                $('#domain-title-' + (idx + 1)).show();
            }
        });

        // Calulate the percentage of growth for the entire domain
        var domainScoreGrowth = 0;
        if (learningObjectiveCounter) {
            domainScoreGrowth = round(domainScore / learningObjectiveCounter);
        }

        var scoreContainer = $('#domain-score-' + currentDomain);
        if (scoreContainer && domainScoreGrowth) {
            scoreContainer.html(
                'You have this much growth: <span id="score-container">' +
                domainScoreGrowth + ' out of 4 </span>');
        }
    });

    // Progress Bar
    if (document.getElementById('cumulative-review')
        && cumulativePreScore.lenght && cumulativePostScore.length) {
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

    /* Demographic Questions */
    $('.demographic-questions input[type="text"]').each(function(idx, el){
        $(el).on('focus', function(e){
            var radioInput = e.target.parentNode.querySelector(
                'input[type="radio"]');
            radioInput.setAttribute('checked', 'true');
        });
        $(el).on('blur', function(e){
            var radioInput = e.target.parentNode.querySelector(
                'input[type="radio"]');
            radioInput.setAttribute('value', e.target.value);
        });
    });
    $('#demographic-info').on('submit', function(e){
        e.preventDefault();
        var role = e.target.elements.role.value;
        var speciality = e.target.elements.speciality.value;
        localStorage.setItem('role', sanitize(role));
        localStorage.setItem('speciality', sanitize(speciality));
        this.style.display = 'none';
        this.nextElementSibling.style.display = '';

        gtag('event', 'demographic_question', {
            'event_category': 'role',
            'event_label': role,
            'value': 1
        });

        gtag('event', 'demographic_question', {
            'event_category': 'speciality',
            'event_label': speciality,
            'value': 1
        });
    });

    // Show the form if the values are not set
    if (!localStorage.getItem('role') && !localStorage.getItem('speciality')) {
        $('#demographic-info').show();
    }

    // Render on Cumulative Review page
    if(document.getElementById('demographic-q-responses') &&
        localStorage.getItem('role') &&
        localStorage.getItem('speciality')) {
        const DEMO_ANSWERS = {
            role: {
                prefer_not_answer: 'Prefer not to answer',
                faculty: 'Faculty',
                resident: 'Resident',
                dentist: 'Dentist',
                student: 'Other'
            },
            speciality: {
                prefer_not_answer: 'Prefer not to answer',
                public_health: 'Public Health',
                general: 'General',
                pediatric: 'Pediatric',
            }
        };

        var role = DEMO_ANSWERS.role[localStorage.getItem('role')];
        var speciality = DEMO_ANSWERS.speciality[
            localStorage.getItem('speciality')];

        // If 'other' is set, and there's no value in the DEMO_ANSWERS
        // for the given question, then just use the value in storage.
        if (!role){
            role = localStorage.getItem('role');
        }
        if (!speciality){
            speciality = localStorage.getItem('speciality');
        }

        $('#demographic-q-responses').append(
            '<p>Role: ' + role + '</p>' +
            '<p>Speciality: ' + speciality + '</p>'
        );
        $('#demographic-q-responses').show();
    }
});
