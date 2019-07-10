/* eslint-disable */
describe('Demo Test', function() {
    it('Stubs in some functionality', function() {
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-0').click();
        cy.contains('Next').click();
        cy.contains('Next').click();
        cy.get('#q1-4').click();
    })
});
