/* eslint-disable scanjs-rules/identifier_localStorage, max-len */
describe('Demographic Questions', function() {
    it('Has "Prefer not to answer as the default option"', function() {
        cy.visit('http://localhost:1313/domains/identify/');
        cy.get('#no-answer-role').should('be.checked');
        cy.get('#no-answer-speciality').should('be.checked');
    });

    it('Displays the demograph questions on the top of each domain', function() {
        ['identify', 'refer', 'manage'].map(function(domain) {
            cy.visit('http://localhost:1313/domains/' + domain + '/');
            cy.get('#role-specialty-modal').should('not.have.css', 'display', 'none');
        });
    });

    it('Hides the demographic questions if they have been answered', function() {
        cy.visit('http://localhost:1313/domains/identify/');
        cy.get('#demographic-info').submit();

        ['identify', 'refer', 'manage'].map(function(domain) {
            cy.visit('http://localhost:1313/domains/' + domain + '/');
            cy.get('#role-specialty-modal').should('have.css', 'display', 'none');
        });
    });

    it('The "other" text box is hidden if other is not selected', function() {
        cy.visit('http://localhost:1313/domains/identify/');
        cy.get('#other-role-text').should('have.css', 'display', 'none');
    });

    it('The "other" text box is shown when other is selected', function() {
        cy.visit('http://localhost:1313/domains/identify/');
        cy.get('#other-role').click();
        cy.get('#other-role-text').should('not.have.css', 'display', 'none');
    });

    it('Sets the value of the "other" radio button when its text box blurs', function() {
        cy.visit('http://localhost:1313/domains/identify/');
        cy.get('#other-role').click();
        cy.get('#other-role-text').type('Space Lizard').blur();
        cy.get('#other-role').should('have.value', 'Space Lizard');
        cy.get('#other-speciality').click();
        cy.get('#other-speciality-text').type('Space Lizard').blur();
        cy.get('#other-speciality').should('have.value', 'Space Lizard');
    });

    it('Saves responses to local storage', function() {
        cy.visit('http://localhost:1313/domains/identify/');
        cy.get('#demographic-info').submit().should(function() {
            expect(localStorage.getItem('role')).to.eq('prefer_not_answer');
            expect(localStorage.getItem('speciality')).to.eq('prefer_not_answer');
        });
    });

    it('Displays the answers on the cumulative review page', function() {
        cy.visit('http://localhost:1313/domains/identify/');
        cy.get('#faculty').click();
        cy.get('#other-speciality').click();
        cy.get('#other-speciality-text').type('Space Lizard').blur();
        cy.get('#demographic-info').submit();

        cy.visit('http://localhost:1313/cumulative-review/');
        cy.get('#demographic-q-responses').contains('Faculty');
        cy.get('#demographic-q-responses').contains('Space Lizard');
    });
});
