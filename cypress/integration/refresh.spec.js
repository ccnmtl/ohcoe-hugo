/* eslint-disable scanjs-rules/identifier_localStorage, max-len */
describe('Test the refresh button', function() {
    var base_url = 'http://localhost:1313';
    it('Tests the button opens the modal', function() {
        cy.visit(base_url);
        cy.get('#refreshModal').should('have.css', 'display', 'none');
        cy.get('#refresh-trigger').click();
        cy.get('#refreshModal').should('not.have.css', 'display', 'none');
    });
    it('Tests that canceling the modal does not delete data', function() {
        cy.visit(base_url + '/domains/identify/');
        cy.get('#demographic-info').submit();
        cy.visit(base_url);
        cy.get('#refresh-trigger').click();
        cy.get('#refresh-dismiss').click().should(function() {
            expect(localStorage.getItem('role')).to.eq('prefer_not_answer');
            expect(localStorage.getItem('speciality')).to.eq('prefer_not_answer');
        });
    });
    it('Tests that clicking the refresh button does delete data', function() {
        cy.visit(base_url + '/domains/identify/');
        cy.get('#demographic-info').submit();
        cy.visit(base_url);
        cy.get('#refresh-trigger').click();
        cy.get('#storage-reset').click().should(function() {
            expect(localStorage.getItem('role')).to.be.null;
            expect(localStorage.getItem('speciality')).to.be.null;
        });
    });
});
