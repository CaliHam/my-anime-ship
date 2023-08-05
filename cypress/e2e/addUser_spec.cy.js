describe('Add user to site', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.intercept('GET', 'https://my-anime-ship-api.onrender.com/api/v1/characters', {
      statusCode: 200,
      fixture: 'allCharacters',
    }).as('getAllCharacters')
    cy.intercept('POST', 'https://my-anime-ship-api.onrender.com/api/v1/zodiac', {
      statusCode: 200,
      body: 'Aries',
    }).as('zodiacPost')
    window.localStorage.clear()
    cy.visit('http://localhost:3000')
  })
  it('Should load user form and allow form to filled out with chosen icon', () => {
    cy.wait('@getAllCharacters')
    cy.location('pathname').should('eq', '/')
    cy.get('h1').should('have.text', 'Would you have a chance with your favorite anime character?')
    .get('.icon-container').click()
    cy.get('.user-pick-icon').last().click()
    cy.get('.icon-container').find('img').should('have.attr', 'src', 'https://u.cubeupload.com/User713646/Screenshot20230802at.png')
    .get('input[name="name"]').clear()
    cy.get('input[name="name"]').type('Lady Young')
    cy.get('input[name="name"]').should('have.value', 'Lady Young')
    .get('input[name="birthday"]').type('1998-04-04')
    cy.should('have.value', '1998-04-04')
    cy.get('.next-container > p').should('have.text', 'Find out now!')
    cy.get('.next-page').click()
    cy.wait('@zodiacPost')
    window.localStorage.setItem('user', JSON.stringify({ name: 'Lady Young', birthday: '1998-04-04', sign:'Aries', icon:'https://u.cubeupload.com/User713646/Screenshot20230802at.png'}));
    cy.visit('http://localhost:3000/match')
    cy.location('pathname').should('eq', '/match')
    cy.get('.user-container').find('p').last().contains('Aries')
  })
})