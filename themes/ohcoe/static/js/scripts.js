document.addEventListener('DOMContentLoaded', function() {
    /* Get and Set Values from Local Storage */
    // Give ids to each learning objective
    var learningObectiveTitle = document.querySelector('#assessment-page-title');
    if (learningObectiveTitle) {
        localStorage.setItem(learningObectiveTitle.dataset.domainid, learningObectiveTitle.dataset.learningObjective);
    }

    // Get values for questions, if they've been answered by the user
    var assessmentQuestions = document.querySelectorAll('.assessment-question');
    assessmentQuestions.forEach(function(el){
        var val = localStorage.getItem(el.name);
        if (val && el.value === val) {
            el.checked = true;
        }

        // Set values for questions
        el.addEventListener('change', function(e){
            localStorage.setItem(el.name, e.target.value);
        });
    });

    // Clear data
    document.querySelector('#storage-reset').addEventListener('click', function(e){
        localStorage.clear();
        location.reload(true);
    })

    // Display Results to Users
    var resultsContainer = document.querySelector('.domain-results tbody');
    var domainResults = document.querySelector('.domain-results');
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
            )
            var tableRow = document.createElement('tr');
            tableRow.innerHTML = '<td>' + localStorage.getItem(prefix) + '</td>' +
                                 '<td>' + preScore + '</td>' +
                                 '<td>' + postScore + '</td>' +
                                 '<td>' + percentageGrowth + '%</td>';
            resultsContainer.appendChild(tableRow);
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

    var scoreContainer = document.getElementById('domain-score-' + currentDomain);
    if (scoreContainer && domainScoreGrowth) {
        scoreContainer.innerHTML = 'You have this much growth: <span id="score-container">' + domainScoreGrowth + '%</span>';
    }

    /* Demographic Questions */
    document.querySelectorAll('.demographic-questions input[type="text"]').forEach(function(el){
        el.addEventListener('focus', function(e){
            var radioInput = e.target.parentNode.querySelector('input[type="radio"]');
            radioInput.setAttribute('checked', 'true');
        })
        el.addEventListener('blur', function(e){
            var radioInput = e.target.parentNode.querySelector('input[type="radio"]');
            radioInput.setAttribute('value', e.target.value);
        })
    });
    document.querySelector('#demographic-info').addEventListener('submit', function(e){
        e.preventDefault();
        var role = e.target.elements.role.value;
        var speciality = e.target.elements.speciality.value;
        localStorage.setItem('role', role);
        localStorage.setItem('speciality', speciality);
        this.style.display = 'none';
        this.nextElementSibling.style.display = '';
    });

    // Show the form if the values are not set
    if (!localStorage.getItem('role') && !localStorage.getItem('speciality')) {
        document.querySelector('#demographic-info').style.display = '';
    }
});
