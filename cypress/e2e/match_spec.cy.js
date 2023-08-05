describe('Match page', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.intercept('GET', 'https://my-anime-ship-api.onrender.com/api/v1/characters', {
      statusCode: 200,
      fixture: 'allCharacters',
    })
    window.localStorage.setItem('user', JSON.stringify({ name: 'Lady Young', birthday: '1998-04-04', sign:'Aries', icon:'https://u.cubeupload.com/User713646/Screenshot20230802at.png'}));
    cy.visit('http://localhost:3000/match')
  })
  it('Should load user and allow user to choose a character based on gender', () => {
    cy.intercept('GET', 'https://my-anime-ship-api.onrender.com/api/v1/characters/6', {
      statusCode: 200,
      fixture: 'chosenCharacter',
    })
    cy.intercept('POST', 'https://my-anime-ship-api.onrender.com/api/v1/synastry', {
      statusCode: 200,
      fixture: 'synastryResults',
    })
    cy.location('pathname').should('eq', '/match')
    .get('h1').contains('Pick Your Match')
    .get('.current-user-icon').should('have.attr', 'src', 'https://u.cubeupload.com/User713646/Screenshot20230802at.png')
    .get('.user-container').find('p').first().should('have.text', 'Lady Young')
    .get('.user-container').find('p').last().should('have.text', 'Aries')
    .get('.all-characters-container').find('.character-container')
    .should('have.length', '4')
    cy.get('.filter-btn').contains('Women').click()
    cy.get('.character-container').should('have.length', '2')
    .get('.character-container').first().should('have.text', 'Faye Valentine')
    .get('.character-container').last().should('have.text', 'Nami')
    cy.get('.filter-btn').contains('Men').click()
    cy.get('.character-container').should('have.length', '2')
    .get('.character-container').first().should('have.text', 'Eren Yeager')
    .get('.character-container').last().should('have.text', 'Levi Ackerman').click()
    cy.get('.all-characters-container').find('#6').should('have.class', 'character-container selected')
    .get('.classic-button').last().click()
    cy.location('pathname').should('eq', '/report')
    .get('h1').should('have.text', 'Compatibility Results')
  })
  it('Should allow user to navigate back and change user', () => {
    cy.location('pathname').should('eq', '/match')
    .get('.classic-button').first().click()
    cy.location('pathname').should('eq', '/')
    .get('input[name="name"]').should('have.value', '')
    .get('input[name="birthday"]').should('have.value', '')
  })
})