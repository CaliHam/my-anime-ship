describe('Saved Reports', () => {
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
    cy.intercept('DELETE', 'https://my-anime-ship-api.onrender.com/api/v1/savedreports/1691015485484', {
      statusCode: 200,
      fixture: 'deleteReport',
    }).as('deleteReport')
    window.localStorage.setItem('user', JSON.stringify({ name: 'Lady Young', birthday: '1998-04-04', sign:'Aries', icon:'https://u.cubeupload.com/User713646/Screenshot20230802at.png'}));
  })
  it('Should view saved reports allowing a user to delete one and navigate back to /match', () => {
    cy.visit('http://localhost:3000')
    cy.wait('@getAllCharacters')
    cy.get('.saved-link').contains('Saved Reports').click()
    cy.wait('@getAllSaved')
    .location('pathname').should('eq', '/savedreports')
    .get('h1').contains('Saved Reports')
    .get('.saved-report-container').find('.saved-report').should('have.length', '2')
    .get('.saved-report').first().find('p').first().contains('Lady Young and Levi Ackerman')
    .get('.saved-report').first().find('p').last().contains('73%')
    .get('.saved-report').first().find('.delete-btn').first().click()
    cy.wait('@deleteReport')
    cy.get('.saved-report-container').find('.saved-report').should('have.length', '1')
    .get('.saved-report').first().find('p').first().contains('Lady Young and Leorio Paradinight')
    .get('.saved-report').first().find('p').last().contains('22%')
    .get('.classic-button').last().click()
    cy.location('pathname').should('eq', '/match')
    .get('h1').contains('Pick Your Match')
  })
  it('Should show message when no reports are saved', () => {
    cy.intercept('GET', 'https://my-anime-ship-api.onrender.com/api/v1/savedreports', {
      statusCode: 200,
      body: [],
    })
    cy.visit('http://localhost:3000/savedreports')
    .get('h1').contains('Saved Reports')
    .get('.saved-report-container').find('h3').contains('Make a calculation and save the report to view it here!')
  })
})