/* eslint-disable scanjs-rules/identifier_localStorage, max-len */
describe('Learning Objective Questions', function() {
    it('Saves the learning objective title and URL to localStorage', function() {
        var url = 'http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/';
        cy.visit(url).should(function(win) {
            cy.log(localStorage);
            expect(localStorage.getItem('1-1')).to.eq('Screen for substance disorders and patients at risk in the dental setting');
            var learningObjectiveUrl = 'http://localhost:1313/domains/identify/screen-for-substance-disorders/';
            expect(localStorage.getItem('1-1-url')).to.eq(learningObjectiveUrl);
        });
    });

    it('Saves the value of pre-assessment scores to localStorage', function() {
        var url = 'http://localhost:1313/domains/identify/screen-for-substance-disorders/pre-assessment/';
        cy.visit(url);
        [...Array(5).keys()].map(function(idx) {
            cy.get('#q1-' + idx).click().should(function() {
                expect(localStorage.getItem('1-1-pre-q1')).to.eq(String(idx));
            });
        });
    });

    it('Saves the value of post-assessment scores to localStorage', function() {
        var url = 'http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/';
        cy.visit(url);
        [...Array(5).keys()].map(function(idx) {
            cy.get('#q1-' + idx).click().should(function() {
                expect(localStorage.getItem('1-1-post-q1')).to.eq(String(idx));
            });
        });
    });

    it('Displays the saved score after navigating/reloading the page', function() {
        var url = 'http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/';
        cy.visit(url);
        cy.get('#q1-0').click().should('be.checked');
        cy.reload();
        cy.get('#q1-0').should('be.checked');
    });

    it('Clears localStorage when the reset button is clicked', function() {
        var url = 'http://localhost:1313/domains/identify/screen-for-substance-disorders/post-assessment/';
        cy.visit(url);
        cy.get('#q1-0').click();
        // Visit a page where no values will be saved to localStorage on load
        cy.visit('http://localhost:1313');
        cy.get('#storage-reset').click().should(function(win) {
            expect(localStorage.length).to.eq(0);
        });
    });
});
