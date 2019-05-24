document.addEventListener('DOMContentLoaded', function() {
    var assessmentQuestions = document.querySelectorAll('.assessment-question');
    assessmentQuestions.forEach(function(el){
        var val = localStorage.getItem(el.name);
        if (val) {
            if (el.type === 'radio') {
                if (el.value === val) {
                    el.checked = true;
                }
            } else if (el.type === 'textarea') {
                el.value = val;
            }
        }

        el.addEventListener('change', function(e){
            localStorage.setItem(el.name, e.target.value);
        });
    });

    document.querySelector('#storage-reset').addEventListener('click', function(e){
        localStorage.clear();
    })
});
