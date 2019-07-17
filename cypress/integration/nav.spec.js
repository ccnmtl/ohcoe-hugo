/* eslint-disable scanjs-rules/identifier_localStorage, max-len */
describe('Navigation Functionality', function() {
    var domain_url = 'http://localhost:1313/domains/identify/';
    it('Adds the active class to pages which are children of index', function() {
        cy.log('Stub');
    });
    it('When on domain pages, adds the active class to "Domains of Expertise" nav item', function() {
        [
            domain_url,
            domain_url + 'screen-for-substance-disorders/',
            domain_url + 'screen-for-substance-disorders/pre-assessment/',
            domain_url + 'screen-for-substance-disorders/video/',
            domain_url + 'screen-for-substance-disorders/post-assessment/',
            domain_url + 'review/'
        ].map(function(url) {
            cy.visit(url);
            cy.get('.dropdown-toggle').should('have.class', 'active');
            cy.contains('.dropdown-item', 'Identify').should('have.class', 'active');
        });
    });
});
