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
});
