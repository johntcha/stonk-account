/// <reference types="cypress"/>

describe('login', () => {
	before(() => {
		cy.intercept('GET', `http://localhost:3002/expense`).as('login');
		cy.visit('/login');
		cy.get('input').first().type('john')
        cy.get('form>input').eq(1).type('tcha')
		cy.contains('Sign in').click()
		cy.wait('@login');
		cy.saveLocalStorage();
	})
    beforeEach(() => {
    	cy.visit('/');
    });

	it('should login', () => {
		cy.get('[aria-label="logout-button"]>span').should('contain', 'Log Out');
	});

})