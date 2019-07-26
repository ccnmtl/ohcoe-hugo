/* eslint-disable scanjs-rules/identifier_localStorage, max-len */
describe('Domain Review Scoring', function() {
    it('Hides the score information if no questions have been answered', function(){
        cy.visit('http://localhost:1313/domains/identify/review/');
        cy.get('#review-score-container').should('have.css', 'display', 'none');
    });
    it('Show the score information if at least one pair of questions have been answered', function(){
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/domains/identify/review/');
        cy.get('#review-score-container').should('not.have.css', 'display', 'none');
    });
    it('Answer a question, check that the correct score, title, and link is displayed on the domain review', function() {
        // Sets the pre score to 0, post score to 4
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/domains/identify/review/');
        cy.get('#1-1-l-obj-title').contains('Screen').should('exist');
        cy.get('#1-1-l-obj-title a').each(function(el) {
            cy.wrap(el).should('have.attr', 'href')
                .and('eq', 'http://localhost:1313/domains/identify/screen-for-substance-disorders/');
        });
        cy.get('#1-1-l-obj-pre-score').contains('0').should('exist');
        cy.get('#1-1-l-obj-post-score').contains('4').should('exist');
        cy.get('#1-1-l-obj-score-diff').contains('4').should('exist');
    });
    it('Answer only the pre-assessment and check that no score is listed', function() {
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/identify/review/');
        cy.get('tr#1-1').should('not.exist');
    });
    it('Answer only the post-assessment and check that no score is listed', function() {
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/identify/review/');
        cy.get('tr#1-1').should('not.exist');
    });
    it('Answer two of the three questions and check that only two are listed', function() {
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/domains/identify/importance-of-dental-providers-role/pre-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/identify/importance-of-dental-providers-role/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/domains/identify/review/');
        cy.get('tr#1-1').should('exist');
        cy.get('tr#1-2').should('not.exist');
        cy.get('tr#1-3').should('exist');
    });
});

describe('Cumulative Review Scoring', function() {
    it('Hides the score information if no questions have been answered', function(){
        cy.visit('http://localhost:1313/cumulative-review/');
        cy.get('#review-score-container').should('have.css', 'display', 'none');
    });
    it('Show the score information if at least one pair of questions have been answered', function(){
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/cumulative-review/');
        cy.get('#review-score-container').should('not.have.css', 'display', 'none');
    });
    it('Answer a question, check that the correct score, title, link, and domain is displayed on the cumulative review', function() {
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/cumulative-review/');
        cy.get('h2#domain-title-1').should('not.have.css', 'display', 'none');
        cy.get('#1-1-l-obj-title').contains(
            'Screen'
        ).should('exist');
        cy.get('#1-1-l-obj-title a').each(function(el) {
            cy.wrap(el).should('have.attr', 'href')
                .and('eq', 'http://localhost:1313/domains/identify/screen-for-substance-disorders/');
        });
        cy.get('#1-1-l-obj-pre-score').contains('0').should('exist');
        cy.get('#1-1-l-obj-post-score').contains('4').should('exist');
        cy.get('#1-1-l-obj-score-diff').contains('4').should('exist');
    });
    it('Answer questions from two domains and check that only those two domains are listed', function() {
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/domains/manage/assess-patient-history/pre-assessment/');
        cy.get('#q1-0').click();
        cy.visit('http://localhost:1313/domains/manage/assess-patient-history/post-assessment/');
        cy.get('#q1-4').click();

        cy.visit('http://localhost:1313/cumulative-review/');
        cy.get('h2#domain-title-1').should('not.have.css', 'display', 'none');
        cy.get('h2#domain-title-2').should('have.css', 'display', 'none');
        cy.get('h2#domain-title-3').should('not.have.css', 'display', 'none');
    });
});
