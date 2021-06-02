describe('login', () => {
	it('should redirect to /login', () => {
		cy.visit('/');
		cy.url().should('include', '/login');
	});

    it('should not log in with empty credentials', () => {
        cy.visit('/login');
		cy.contains('Sign in').click();
        cy.url().should('include', '/login');
    })

})