it('Tests the home page', function() {
    cy.visit('http://localhost:1313');
    cy.injectAxe();
    cy.checkA11y();
});
