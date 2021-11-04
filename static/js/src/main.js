import * as Sentry from '@sentry/browser';
import 'bootstrap';
import { learningObjectiveQuestions } from './learningObjectiveQuestions.js';
import { scores } from './scores.js';
import { progressIcons } from './progressIcons.js';
import { analytics } from './analytics.js';
import { demographicQuestions } from './demographicQuestions.js';

Sentry.init({ dsn: 'https://a75b069e0ae04e49a45cdc377207843f@sentry.io/1725761'  });

learningObjectiveQuestions();
scores();
progressIcons();
analytics();
demographicQuestions();

function setEqualHeight(selector) {
    var maxHeight = 0;

    $(selector).each(function(idx, el) {
        $(el).css('height', 'unset');
        if ($(el).height() > maxHeight) {
            maxHeight = $(el).height();
        }
    });

    $(selector).each(function(idx, el) {
        $(el).height(maxHeight);
    });
}

setEqualHeight('.get-started-domain-sub');

window.addEventListener('resize', function() {
    setEqualHeight('.get-started-domain-sub');
});
