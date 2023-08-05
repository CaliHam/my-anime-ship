describe('Navbar navigation', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.intercept('GET', 'https://my-anime-ship-api.onrender.com/api/v1/characters', {
      statusCode: 200,
      fixture: 'allCharacters',
    }).as('getAllCharacters')
    cy.intercept('GET', 'https://my-anime-ship-api.onrender.com/api/v1/savedreports', {
      statusCode: 200,
      fixture: 'allSavedReports',
    }).as('getAllSaved')
  })
  it('Should navigate to expected pages', () => {
    cy.visit('http://localhost:3000')
    cy.wait('@getAllCharacters')
    cy.get('.saved-link').should('have.text', 'Saved Reports').click()
    cy.wait('@getAllSaved')
    cy.location('pathname').should('eq', '/savedreports')
    cy.get('.nav-logo').click()
    cy.wait('@getAllCharacters')
    cy.location('pathname').should('eq', '/')
  })
})