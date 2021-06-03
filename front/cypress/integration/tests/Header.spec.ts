/// <reference types="cypress"/>

describe('Header', () => {
	//We only log in once before running all the test
	before(() => {
		cy.intercept('GET', `http://localhost:3002/expense`).as('login');
		cy.visit('/login');
		cy.get('input').first().type('john')
        cy.get('form>input').eq(1).type('tcha')
		cy.contains('Sign in').click()
		cy.wait('@login');
	})

	beforeEach(() => {
		cy.restoreLocalStorage();
		cy.visit('/');
	});
	  
	afterEach(() => {
		cy.saveLocalStorage();
	});

	it("should display the user's username", () => {
		cy.get('.header').should('contain', 'John')
	})

	it('should show the Log Out button on both desktop and mobile view', () => {
		cy.get('[aria-label="logout-button"]').should('be.visible');
		cy.get('[aria-label="logout-button"]>span').should('contain', 'Log Out');
		cy.viewport('iphone-x');
		cy.get('[aria-label="logout-button-mobile"]').should('be.visible');
	});
	
	it('should log out the user', () => {
		cy.get('[aria-label="logout-button"]').should('be.visible');
		cy.get('[aria-label="logout-button"]').click()
		cy.url().should('include', '/login');
	});
})