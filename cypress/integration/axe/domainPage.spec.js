it('Tests the domain page', function() {
    cy.visit('http://localhost:1313/domains/identify');
    cy.injectAxe();

    // Open a nav item first, Axe won't check non-visible elements
    cy.get('.dropdown-toggle').first().click();
    cy.checkA11y();
});
