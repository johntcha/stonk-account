describe('login', () => {
	it('should redirect to /login', ()=> {
		cy.visit('/');
		cy.url().should('include', '/login');
	});
})