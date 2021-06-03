/// <reference types="cypress"/>

describe('login', () => {
    beforeEach(() => {
        cy.visit('/login');
      });

	it('should redirect to /login', () => {
		cy.visit('/');
		cy.url().should('include', '/login');
	});

    it('should not log in with empty credentials', () => {
		cy.contains('Sign in').click();
        cy.url().should('include', '/login');
    })
    it('should login', () => {
        cy.intercept('GET', `http://localhost:3002/expense`).as('login');
        cy.get('input').first().type('john')
        cy.get('form>input').eq(1).type('tcha')
		cy.contains('Sign in').click()
        cy.wait('@login');
        cy.url().should('eq', 'http://localhost:3000/');
    })

    it('should open/close sign up pop', () => {
		cy.contains('Sign up').click()
        cy.get('.signup-form').should('exist');
        cy.get('.signup-form').should('be.visible');
        cy.get('.signup-form button').first().click();
        cy.get('.signup-form').should('not.exist');
	});

    it('should create an user', () => {
        cy.intercept('POST', `http://localhost:3002/users`).as('createUser');
		cy.contains('Sign up').click()
        cy.get('.signup-form').should('exist');
        cy.get('.signup-form').should('be.visible');
        cy.get('.signup-form>input').eq(0).type('monsieur')
        cy.get('.signup-form>input').eq(1).type('test')
        cy.contains('Create account').click()
        cy.wait('@createUser')
        cy.get('.signup-form>div').contains('Your account has been created !')
	});
})