/* eslint-disable scanjs-rules/identifier_localStorage, max-len */
describe('Test the reset button', function() {
    var base_url = 'http://localhost:1313';
    it('Tests the button opens the modal', function() {
        cy.visit(base_url);
        cy.get('#resetModal').should('have.css', 'display', 'none');
        cy.get('#reset-trigger').click();
        cy.get('#resetModal').should('not.have.css', 'display', 'none');
    });
    it('Tests that canceling the modal does not delete data', function() {
        cy.visit(base_url + '/domains/identify/');
        cy.get('#demographic-info').submit();
        cy.visit(base_url);
        cy.get('#reset-trigger').click();
        cy.get('#reset-dismiss').click().should(function() {
            expect(localStorage.getItem('role')).to.eq('prefer_not_answer');
            expect(localStorage.getItem('speciality')).to.eq('prefer_not_answer');
        });
    });
    it('Tests that clicking the reset button does delete data', function() {
        cy.visit(base_url + '/domains/identify/');
        cy.get('#demographic-info').submit();
        cy.visit(base_url);
        cy.get('#reset-trigger').click();
        cy.get('#storage-reset').click().should(function() {
            expect(localStorage.getItem('role')).to.be.null;
            expect(localStorage.getItem('speciality')).to.be.null;
        });
    });
});
