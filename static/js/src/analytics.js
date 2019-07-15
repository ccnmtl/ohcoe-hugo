/* eslint-disable scanjs-rules/identifier_localStorage */
import { sanitize } from './utils.js';

function analytics() {
    /* Analytics for learning objective scores */
    // On domain review pages, collect any learning objective scores
    // and ship them to Google Analytics
    if (document.getElementById('domain-review')){
        var currentDomain = $('.domain-results').id;

        // Get flag for GA Status
        var status = localStorage.getItem(
            'domain-ga-status-' + currentDomain) === 'sent' ? true : false;

        if (status) {
            [...Array(3).keys()].map((el) => {
                var q = el + 1;
                var prefix = currentDomain + '-' + q;
                var preScore = localStorage.getItem(prefix + '-pre-q1');
                var postScore = localStorage.getItem(prefix + '-post-q1');

                if (preScore && postScore) {
                    // Ship scores to Google Analytics
                    gtag('event', 'assessment_question', {
                        'event_category': 'learning-assessment-question',
                        'event_label': prefix + 'pre',
                        'value': preScore
                    });
                    gtag('event', 'assessment_question', {
                        'event_category': 'learning-assessment-question',
                        'event_label': prefix + 'post',
                        'value': postScore
                    });
                }
            });

            // Mark the current domain 'sent'
            localStorage.setItem(
                'domain-ga-status-' + currentDomain, 'sent');
        }
    }

    /* Demographic Question Analytics */
    $('#demographic-info').on('submit', function(e){
        e.preventDefault();
        var role = sanitize(e.target.elements.role.value);
        var speciality = sanitize(e.target.elements.speciality.value);

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


    /* Google Analytics YouTube Events */
    var tag = document.createElement('script');
    tag.id = 'iframe-api';
    /* eslint-disable-next-line scanjs-rules/assign_to_src */
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function onPlayerReady(event) {
        // Stub
    }

    function onPlayerStateChange(event) {
        // Stub
    }

    var players = new Array();
    window.onYouTubeIframeAPIReady = function() {
        // Reduce over an array of iFrames on the page, instantiate new
        // players for each, and push to an array
        $('.ytplayer').each(function(idx, el){
            var player = new YT.Player(el.id, {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
            players.push(player);
        });
    };
    window.players = players;
}

export { analytics };
