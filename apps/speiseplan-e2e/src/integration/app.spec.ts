import { getGreeting } from '../support/app.po';

describe('speiseplan', () => {
  beforeEach(() => cy.visit('/'));

  it('must show Gulasch in the recipe list, when added Gulasch in the recipe form', () => {
    cy.get('form input[name=name]')
      .type('Gulasch')
      .should('have.value', 'Gulasch')

    cy.get('form').submit();

    cy.get('.recipe-heading').should('have.text', 'Liste aller 1 Rezepte')
    cy.get('.recipe-list-item').first().should('have.text', 'Gulasch')
  });

  it('must show Gulasch with the ingredients Fleisch and Zwiebeln, when added in the recipe form', () => {
    cy.get('form input[name=name]')
      .type('Gulasch')
      .should('have.value', 'Gulasch')
    
    cy.get('input[name=zutat-0]')
      .type('Fleisch')
    
    cy.get('.add-ingredient')
      .click();

    cy.get('input[name=zutat-1]')
      .type('Zwiebeln')

    cy.get('form').submit();

    cy.get('.recipe-heading').should('have.text', 'Liste aller 1 Rezepte')
    cy.get('.recipe-list-item').first()
      .should('have.text', 'Gulasch')
      .click()

    cy.get('li:nth-child(1) .recipe-ingredient').should('have.text', 'Fleisch')
    cy.get('li:nth-child(2) .recipe-ingredient').should('have.text', 'Zwiebeln')
  })
});
