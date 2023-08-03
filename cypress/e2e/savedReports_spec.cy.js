describe('Saved Reports', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/characters', {
      statusCode: 200,
      fixture: 'allCharacters',
    }).as('getAllCharacters')
    cy.intercept('GET', 'http://localhost:3001/api/v1/savedreports', {
      statusCode: 200,
      fixture: 'allSavedReports',
    }).as('getAllSaved')
  })
  it('Should navigate to expected pages', () => {
    cy.visit('http://localhost:3000')
    cy.wait('@getAllCharacters')
    cy.get('.saved-link').contains('Saved Reports').click()
    cy.wait('@getAllSaved')
    cy.location('pathname').should('eq', '/savedreports')
    cy.get('h1').contains('Saved Reports')
    cy.get('.saved-report-container').find('.saved-report').should('have.length', '2')
  })
})