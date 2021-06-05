/// <reference types="cypress"/>

describe('CardInputData', () => {
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

	it("should display date picker popup", () => {
		cy.get('[aria-label="change date"]').click()
		cy.get('[role="presentation"]').should('be.visible');
	})

    it("should display the both types in a popup and change it when the other one is selected", () => {
        cy.get('[aria-label="type"]>input').should('have.value', 'Expense')
        cy.get('[aria-label="type"]>div').should('contain', 'Expense')
		cy.get('[aria-label="type"]').click()
		cy.get('[role="listbox"]').should('be.visible');
        cy.get('[data-value="Gain"]').click()
        cy.get('[aria-label="type"]>input').should('have.value', 'Gain')
        cy.get('[aria-label="type"]>div').should('contain', 'Gain')
	})

    it("should display the forth currencies in a popup and change it when another one is selected", () => {
        cy.get('[aria-describedby="standard-select-currency-helper-text"]').should('have.value', '€')
        cy.get('[aria-labelledby="standard-select-currency-label standard-select-currency"]').should('contain', '€')
		cy.get('[aria-label="currency-picker"]>div').click()
		cy.get('[role="listbox"]').should('be.visible');
        cy.get('[data-value="$"]').click()
        cy.get('[aria-describedby="standard-select-currency-helper-text"]').should('have.value', '$')
        cy.get('[aria-labelledby="standard-select-currency-label standard-select-currency"]').should('contain', '$')
	})

    it("should displayed the added expense/gain to the Account history", () => {
        const taille = document.getElementsByClassName("expenses-list").length;
        console.log(taille)
        cy.intercept('GET', `http://localhost:3002/expense`).as('getExpense');
        cy.get('[aria-label="category"]>div>input').should('have.value', '')
        cy.get('[aria-label="category"]>div>input').type('testing')
        cy.get('[aria-label="category"]>div>input').should('have.value', 'testing')
        cy.get('[aria-label="amount"]>div>input').should('have.value', '')
        cy.get('[aria-label="amount"]>div>input').type('25.25')
        cy.get('[aria-label="amount"]>div>input').should('have.value', '25.25')
        cy.contains('Add').click()
        cy.wait('@getExpense');
        cy.get('.expenses-list>tbody>tr').last().get('tr').eq(2).should('contain', 'testing')
        cy.get('.expenses-list>tbody>tr').last().get('tr').eq(3).should('contain', '-25.25')
        cy.get('.expenses-list>tbody>tr').last().get('tr').eq(4).should('contain', '€')
        
	})

})