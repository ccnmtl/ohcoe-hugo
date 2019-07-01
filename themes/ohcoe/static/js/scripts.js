/* eslint-disable scanjs-rules/identifier_localStorage */
$(function() {
    /* Get and Set Values from Local Storage */
    // Give ids to each learning objective
    var learningObectiveTitle = document.querySelector(
        '#assessment-page-title');
    if (learningObectiveTitle) {
        localStorage.setItem(learningObectiveTitle.dataset.domainid,
            learningObectiveTitle.dataset.learningObjective);
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

    // Display Results to Users
    var resultsContainer = $('.domain-results tbody');
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
                var percentageGrowth = Math.round(
                    ((postScore - preScore) / 4) * 100
                );
                var tableRow = $('<tr></tr>');
                tableRow.html('<td>' + localStorage.getItem(prefix) + '</td>' +
                              '<td>' + preScore + '</td>' +
                              '<td>' + postScore + '</td>' +
                              '<td>' + percentageGrowth + '%</td>');
                resultsContainer[idx].append(tableRow[0]);
                domainScore += learningObjectiveScore;
                learningObjectiveCounter += 1;
            }
        });

        // Calulate the percentage of growth for the entire domain
        var domainScoreGrowth = 0;
        if (learningObjectiveCounter) {
            domainScoreGrowth = Math.round(
                (domainScore / (learningObjectiveCounter * 4)) * 100
            );
        }

        var scoreContainer = $('#domain-score-' + currentDomain);
        if (scoreContainer && domainScoreGrowth) {
            scoreContainer.html(
                'You have this much growth: <span id="score-container">' +
                domainScoreGrowth + '%</span>');
        }
    });

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
        localStorage.setItem('role', role);
        localStorage.setItem('speciality', speciality);
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
});
