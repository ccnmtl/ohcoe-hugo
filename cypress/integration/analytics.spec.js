/* eslint-disable scanjs-rules/identifier_localStorage, scanjs-rules/property_localStorage, max-len */
Cypress.on('window:before:load', function(win) {
    win.ga = cy.stub().as('ga');
});
describe('Google Analytics integration', function() {
    it('Checks that GA loads', function() {
        cy.visit('http://localhost:1313');
        cy.get('@ga').should('be.calledWith', 'create', 'UA-51144540-32')
            .and('be.calledWith', 'gtag_UA_51144540_32.send', 'pageview');
    });
    it('Learning Objective scores are sent to Google Analytics on the domain review pages', function() {
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/domains/identify/review/');
        cy.get('@ga').should('be.calledWith', 'gtag_UA_51144540_32.send', 'event');
        cy.window(function(win) {
            expect(win.localStorage.getItem('domain-ga-status-1')).to.eq('sent');
        });
    });
    it('Learning Objective scores are not sent to GA if the flag is set', function() {
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/domains/identify/review/');
        cy.get('@ga').should('be.calledWith', 'gtag_UA_51144540_32.send', 'event');

        cy.reload();
        cy.get('@ga').should('not.be.calledWith', 'gtag_UA_51144540_32.send', 'event');
    });
    it('Updating a learning objective score unsets the GA flag for that particular domain', function() {
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/domains/identify/review/');
        cy.window(function(win) {
            expect(win.localStorage.getItem('domain-ga-status-1')).to.eq('sent');
        });

        // Now go back and change a score
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-1').click();
        cy.window(function(win) {
            expect(win.localStorage.getItem('domain-ga-status-1')).to.be.null;
        });
    });
});
