it('Tests the domain page', function() {
    cy.visit('http://localhost:1313/domains/identify');
    cy.injectAxe();

    cy.checkA11y();
});
