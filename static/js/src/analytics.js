import { sanitize } from './utils.js';

function analytics() {
    /* Analytics for learning objective scores */
    // On domain review pages, collect any learning objective scores
    // and ship them to Google Analytics
    if (document.getElementById('domain-review')){
        var currentDomain = $('.domain-results')[0].id;

        // Get flag for GA Status
        var status = localStorage.getItem(
            'domain-ga-status-' + currentDomain) === 'sent' ? false : true;

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
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    class VideoTracker {
        constructor() {
            this.totalTime = 0;
            // Uses startTime as a flag to track if a video is playing
            this.startTime = null;
        }

        videoStart(time) {
            if (!this.startTime) {
                this.startTime = time;
            }
        }

        videoStop(time) {
            if (this.startTime) {
                this.totalTime += (time - this. startTime);
                this.startTime = null;
            }
        }

        getTotalTime(time) {
            if (this.startTime) {
                this.totalTime += (time - this. startTime);
                this.startTime = null;
                return this.totalTime;
            }
            return this.totalTime;
        }

    }

    function onPlayerStateChange(event) {
        // Return if target is not yet instantiated
        if (!event.target.a) {
            return;
        }
        var tracker = window.videoTrackers[event.target.a.id];
        var time = event.target.getCurrentTime();

        if (event.data === 1) {
            tracker.videoStart(time);
        } else {
            tracker.videoStop(time);
        }
    }

    var players = new Array();
    var videoTrackers = new Object();
    window.players = players;
    window.videoTrackers = videoTrackers;

    window.onYouTubeIframeAPIReady = function() {
        // Reduce over an array of iFrames on the page, instantiate new
        // players for each, and push to an array
        $('.ytplayer').each(function(idx, el){
            var player = new YT.Player(el.id, {
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
            players.push(player);

            var tracker = new VideoTracker();
            videoTrackers[el.id] = tracker;
        });

        // Add event listeners for page navigation
        $('a[href^="/"],a[href^="http"]').each(function(idx, el){
            $(el).on('click', function(e){
                e.preventDefault();

                let analyticsSubmitted = false;
                function followLink() {
                    if (!analyticsSubmitted) {
                        analyticsSubmitted = true;

                        let target = e.target;
                        while (!$(target).attr('href')) {
                            target = target.parentElement;
                        }

                        var href = $(target).attr('href');
                        var anchorTarget = $(target).attr('target');
                        if (anchorTarget === '_blank') {
                            window.open(href, '_blank');
                        } else {
                            location.href = href;
                        }
                    }
                }
                setTimeout(followLink, 200);

                window.players.forEach(function(elt){
                    elt.stopVideo();
                    // Guard against player object not being fully loaded
                    if (!elt.getCurrentTime || !elt.a) {
                        return;
                    }

                    let tracker = window.videoTrackers[elt.a.id];
                    let totalTime = tracker.getTotalTime(elt.getCurrentTime());
                    let videoDuration = elt.getDuration();
                    let videoData = elt.getVideoData();
                    if (totalTime > 0) {
                        gtag('event', 'video_interaction', {
                            'event_category': 'seconds_played',
                            'event_label': videoData.title,
                            'value': totalTime
                        });

                        if (videoDuration > 0) {
                            gtag('event', 'video_interaction', {
                                'event_category': 'seconds_played_pct',
                                'event_label': videoData.title,
                                'value': (totalTime / videoDuration) * 100
                            });
                        }
                    }
                });
            });
        });
    };
}

export { analytics };
