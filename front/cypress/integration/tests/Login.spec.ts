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
    it('should login', () => {
        cy.server();
        cy.route('GET', 'http://localhost:3002/expense').as('login');
        cy.visit('/login');
        cy.get('input').first().type('john')
        cy.get('form>input').eq(1).type('tcha')
		cy.contains('Sign in').click()
        cy.wait('@login');
        cy.url().should('eq', 'http://localhost:3000/');
    })

})