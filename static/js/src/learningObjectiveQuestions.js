/* eslint-disable scanjs-rules/identifier_localStorage */
function learningObjectiveQuestions() {
    /* Get and Set Values from Local Storage */
    var learningObectiveTitle = document.querySelector(
        '#assessment-page-title');
    if (learningObectiveTitle) {
        var currentDomain = learningObectiveTitle.dataset.domainId;
        localStorage.setItem(
            learningObectiveTitle.dataset.learningObjectiveId,
            learningObectiveTitle.dataset.learningObjective);
        localStorage.setItem(
            learningObectiveTitle.dataset.learningObjectiveId + '-url',
            learningObectiveTitle.dataset.learningObjectiveUrl);

        // Get values for questions, if they've been answered by the user
        var assessmentQuestions = document.querySelectorAll(
            '.assessment-question');
        assessmentQuestions.forEach(function(el){
            var val = localStorage.getItem(el.name);
            if (val && el.value === val) {
                el.checked = true;
            }

            // Set values for questions
            $(el).on('change', function(e){
                localStorage.setItem(el.name, e.target.value);
                // Clear the domain GA 'sent' flag here
                localStorage.removeItem(
                    'domain-ga-status-' + currentDomain);
            });
        });
    }

    // Clear data
    $('#storage-reset').on('click', function(e){
        localStorage.clear();
        location.reload(true);
    });

    /* Print review pages */
    $('#review-print').on('click', function(e){
        e.preventDefault();
        window.print();
    });
}

export { learningObjectiveQuestions };
