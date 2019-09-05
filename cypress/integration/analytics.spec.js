/* eslint-disable scanjs-rules/identifier_localStorage, max-len */
describe('Google Analytics Custom Event tests', () => {
    it('checks event is called when demographic questions are answered', () => {
        cy.visit('http://localhost:1313/domains/identify/').then((win) => {
            win.gtag = cy.stub().as('gtag');
        }).then(() => {
            cy.get('#demographic-info').submit();
            cy.get('@gtag').should(
                'be.calledWith',
                'event',
                'demographic_question',
                {
                    'event_category': 'role',
                    'event_label': 'prefer_not_answer',
                    'value': 1
                }
            ).and(
                'be.calledWith',
                'event',
                'demographic_question',
                {
                    'event_category': 'speciality',
                    'event_label': 'prefer_not_answer',
                    'value': 1
                }
            );
        });
    });
    it('plays a video and checks that gtag is called on click', function() {
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/video/').then((win) => {
            win.gtag = cy.stub().as('gtag');
        }).then((win) => {
            // click the video, wait 3 seconds, click another link, and assert the test
            win.videoTrackers['ytplayer-A9aLIXkf05Y'].videoStart(0.00);
            win.videoTrackers['ytplayer-A9aLIXkf05Y'].videoStop(3.45);
            cy.get('.input-group > .btn').contains('Next').click().then(() => {
                cy.get('@gtag').should('be.called');
            });
        });
    });

});
