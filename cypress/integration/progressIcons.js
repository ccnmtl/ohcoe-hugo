/* eslint-disable scanjs-rules/identifier_localStorage, max-len */
describe('The Heart Indicators', function() {
    it('On the domain review, it sets the attributes on the heart icons correctly', function() {
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-2').click();

        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
        cy.get('#q1-3').click();

        cy.visit('http://localhost:1313/domains/identify/demonstrate-awareness-of-opioid-risk/pre-assessment/');
        cy.get('#q1-3').click();

        cy.visit('http://localhost:1313/domains/identify/demonstrate-awareness-of-opioid-risk/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/domains/identify/review/');
        cy.log('For the pre score, two and half hearts should be filled in');
        cy.get('#heart-fill-pre-0-red').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-pre-0-gray').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-pre-1-red').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-pre-1-gray').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-pre-2-red').should('have.attr', 'offset').and('eq', '50%');
        cy.get('#heart-fill-pre-2-gray').should('have.attr', 'offset').and('eq', '50%');
        cy.get('#heart-fill-pre-3-red').should('have.attr', 'offset').and('eq', '0%');
        cy.get('#heart-fill-pre-3-gray').should('have.attr', 'offset').and('eq', '0%');
        cy.get('#domain-pre-diff').contains('Pre-Assessment Score: 2.5');

        cy.log('For the post score, three and half hearts should be filled in');
        cy.get('#heart-fill-post-0-red').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-post-0-gray').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-post-1-red').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-post-1-gray').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-post-2-red').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-post-2-gray').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-post-3-red').should('have.attr', 'offset').and('eq', '50%');
        cy.get('#heart-fill-post-3-gray').should('have.attr', 'offset').and('eq', '50%');
        cy.get('#domain-post-diff').contains('Post-Assessment Score: 3.5');
    });

    it('On the cumulative review, it sets the attributes on the heart icons correctly', function() {
        cy.log('Visit one domain');
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-2').click();

        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
        cy.get('#q1-3').click();

        cy.log('Visit another domain');
        cy.visit('http://localhost:1313/domains/refer/knowledge-of-social-behavioral-treatment/pre-assessment/');
        cy.get('#q1-3').click();

        cy.visit('http://localhost:1313/domains/refer/knowledge-of-social-behavioral-treatment/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/cumulative-review/');
        cy.log('For the pre score, two and half hearts should be filled in');
        cy.get('#heart-fill-pre-0-red').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-pre-0-gray').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-pre-1-red').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-pre-1-gray').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-pre-2-red').should('have.attr', 'offset').and('eq', '50%');
        cy.get('#heart-fill-pre-2-gray').should('have.attr', 'offset').and('eq', '50%');
        cy.get('#heart-fill-pre-3-red').should('have.attr', 'offset').and('eq', '0%');
        cy.get('#heart-fill-pre-3-gray').should('have.attr', 'offset').and('eq', '0%');
        cy.get('#cumulative-pre-diff').contains('Pre-Assessment Score: 2.5');

        cy.log('For the post score, three and half hearts should be filled in');
        cy.get('#heart-fill-post-0-red').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-post-0-gray').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-post-1-red').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-post-1-gray').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-post-2-red').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-post-2-gray').should('have.attr', 'offset').and('eq', '100%');
        cy.get('#heart-fill-post-3-red').should('have.attr', 'offset').and('eq', '50%');
        cy.get('#heart-fill-post-3-gray').should('have.attr', 'offset').and('eq', '50%');
        cy.get('#cumulative-post-diff').contains('Post-Assessment Score: 3.5');
    });
});
