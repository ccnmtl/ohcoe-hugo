it('Tests the home page', function() {
    cy.visit('http://localhost:1313');
    cy.injectAxe();

    // Open a nav item first, Axe won't check non-visible elements
    cy.get('.dropdown-toggle').first().click();
    cy.checkA11y();
});
