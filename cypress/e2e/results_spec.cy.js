describe('Results page', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.intercept('GET', 'https://my-anime-ship-api.onrender.com/api/v1/characters', {
      statusCode: 200,
      fixture: 'allCharacters',
    })
    cy.intercept('GET', 'https://my-anime-ship-api.onrender.com/api/v1/characters/6', {
      statusCode: 200,
      fixture: 'chosenCharacter',
    })
    cy.intercept('POST', 'https://my-anime-ship-api.onrender.com/api/v1/synastry', {
      statusCode: 200,
      fixture: 'synastryResults',
    })
    cy.intercept('POST', 'https://my-anime-ship-api.onrender.com/api/v1/savedreports', {
      statusCode: 200,
      fixture: 'currentReport',
    })
    window.localStorage.setItem('user', JSON.stringify({ name: 'Lady Young', birthday: '1998-04-04', sign:'Aries', icon:'https://u.cubeupload.com/User713646/Screenshot20230802at.png'}));
    cy.visit('http://localhost:3000/match')
  })
  it('Should load compatibility report and allow the user to save the report and navigate back to choose another man', () => {
    cy.get('.all-characters-container').find('#6').click()
    cy.get('.classic-button').last().click()
    cy.location('pathname').should('eq', '/report')
    .get('h1').should('have.text', 'Compatibility Results')
    .get('h3').should('have.text', 'Lady Young & Levi Ackerman')
    .get('.report-score').should('have.text', '63%')
    .get('article').last().should('have.text', 'Pisces provides a balance to Taurus`s practical nature with their emotional depth.')
    .get('.save-report').click()
    cy.get('.whole-report-wrapper').find('.saved-checkmark')
    .get('.classic-button').last().click()
    cy.location('pathname').should('eq', '/match')
    .get('h1').should('have.text', 'Pick Your Match')
  })
})