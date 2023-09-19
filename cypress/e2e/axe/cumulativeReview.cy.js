it('Tests the domain reveiw pages', function() {
    cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/');
    cy.get('#q1-0').click();
    cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
    cy.get('#q1-4').click();

    cy.visit('http://localhost:1313/domains/refer/knowledge-of-social-behavioral-treatment/pre-assessment/');
    cy.get('#q1-0').click();
    cy.visit('http://localhost:1313/domains/refer/knowledge-of-social-behavioral-treatment/post-assessment/');
    cy.get('#q1-4').click();

    cy.visit('http://localhost:1313/cumulative-review/');
    cy.injectAxe();
    cy.checkA11y();
});
