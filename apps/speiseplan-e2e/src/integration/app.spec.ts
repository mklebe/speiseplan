import { getGreeting } from '../support/app.po';

describe('speiseplan', () => {
  beforeEach(() => cy.visit('/'));

  it('must show Gulasch in the recipe list, when added Gulasch in the recipe form', () => {
    cy.get('form input[name=name]')
      .type('Gulasch')
      .should('have.value', 'Gulasch')

    cy.get('form')
      .submit();

    cy.get('.recipe-list-item').first().should('have.text', 'Gulasch')
  });
});
