it('Tests the domain page', function() {
    cy.visit('http://localhost:1313/domains/identify');
    cy.get('#demographic-info').submit();
    // Reload the page to sidestep waiting for the modal to go away
    cy.visit('http://localhost:1313/domains/identify');

    cy.injectAxe();
    cy.checkA11y();
});
