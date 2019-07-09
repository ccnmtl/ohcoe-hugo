requirejs.config({
    baseUrl: document.location.origin + '/js/',
    paths: {
        'bootstrap': 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min',
        'domReady': 'lib/require/domReady',
        'jquery': 'https://code.jquery.com/jquery-3.3.1.slim.min',
        'utils': 'src/utils',
        'learningObjectiveQuestions': 'src/learningObjectiveQuestions',
        'scores': 'src/scores',
        'progressBars': 'src/progressBars',
        'analytics': 'src/analytics',
        'demographicQuestions': 'src/demographicQuestions',
    },
    shim: {
        'bootstrap': {
            'deps': ['jquery']
        },
        'utils': {
            'deps': ['jquery']
        },
        'learningObjectiveQuestions': {
            'deps': ['jquery']
        },
        'scores': {
            'deps': ['jquery']
        },
        'progressBars': {
            'deps': ['jquery']
        },
        'analytics': {
            'deps': ['jquery']
        },
        'demographicQuestions': {
            'deps': ['jquery']
        },
    }
});

const MOD_ARR = [
    'jquery', 'domReady', 'bootstrap', 'utils', 'learningObjectiveQuestions',
    'scores', 'progressBars', 'analytics', 'demographicQuestions'];

requirejs(MOD_ARR, function(
    $, domReady, bootstrap, utils, learningObjectiveQuestions, scores,
    progressBars, analytics, demographicQuestions) {

    learningObjectiveQuestions.render();
    scores.render();
    progressBars.render(utils);
    analytics.render(utils);
    demographicQuestions.render(utils);
});
