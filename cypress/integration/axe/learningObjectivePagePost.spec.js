it('Tests the top level leaerning objective page template', function() {
    cy.visit('http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/');
    cy.injectAxe();

    // Open a nav item first, Axe won't check non-visible elements
    cy.get('.dropdown-toggle').first().click();
    cy.checkA11y();
});
