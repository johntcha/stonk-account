/// <reference types="cypress"/>

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
        cy.intercept('GET', `http://localhost:3002/expense`).as('login');
        cy.visit('/login');
        cy.get('input').first().type('john')
        cy.get('form>input').eq(1).type('tcha')
		cy.contains('Sign in').click()
        cy.wait('@login');
        cy.url().should('eq', 'http://localhost:3000/');
    })

    it('should open/close sign up pop', () => {
        cy.visit('/login');
		cy.contains('Sign up').click()
        cy.get('.signup-form').should('exist');
        cy.get('.signup-form').should('be.visible');
        cy.get('.signup-form button').first().click();
        cy.get('.signup-form').should('not.exist');
	});

    // it('should create an user and log in', () => {
    //     cy.visit('/login');
	// 	cy.contains('Sign up').click()
    //     cy.get('.signup-form').should('exist');
    //     cy.get('.signup-form').should('be.visible');
    //     cy.get('form>input').first().type('monsieur')
    //     cy.get('form>input').eq(1).type('test')
    //     cy.contains('Create account').click();
	// });
})