describe('Match page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/characters', {
      statusCode: 200,
      fixture: 'allCharacters',
    }).as('getAllCharacters')
    window.localStorage.setItem('user', JSON.stringify({ name: 'Lady Young', birthday: '1998-04-04', sign:'Aries', icon:'https://u.cubeupload.com/User713646/Screenshot20230802at.png'}));
    cy.visit('http://localhost:3000/match')
  })
  it('Should load user and allow user to choose a man', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/characters/6', {
      statusCode: 200,
      fixture: 'chosenCharacter',
    })
    cy.intercept('POST', 'http://localhost:3001/api/v1/synastry', {
      statusCode: 200,
      fixture: 'synastryResults',
    }).as('matchResults')
    cy.location('pathname').should('eq', '/match')
    .get('h1').contains('Pick Your Man')
    .get('.current-user-icon').should('have.attr', 'src', 'https://u.cubeupload.com/User713646/Screenshot20230802at.png')
    .get('.user-container').find('p').first().contains('Lady Young')
    .get('.user-container').find('p').last().contains('Aries')
    .get('.all-characters-container').find('#6').click()
    cy.get('.classic-button').last().click()
    cy.location('pathname').should('eq', '/report')
    .get('h1').contains('Compatibility Results')
  })

})