describe('Add user to site', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/characters', {
      statusCode: 200,
      fixture: 'allCharacters',
    }).as('getAllCharacters')
    cy.intercept('POST', 'http://localhost:3001/api/v1/zodiac', {
      statusCode: 200,
      body: 'Aries',
    }).as('zodiacPost')
  })
  it('Should load user form and allow form to filled out with chosen icon', () => {
    cy.visit('http://localhost:3000')
    cy.wait('@getAllCharacters')
    cy.get('h1').contains('Would you have a chance with your favorite anime character? Find out now!')
    .get('.icon-container').click()
    cy.get('.user-pick-icon').last().click()
    cy.get('.icon-container').find('img').should('have.attr', 'src', 'https://u.cubeupload.com/User713646/Screenshot20230802at.png')
    .get('input[name="name"]').type('Lady Young')
    cy.should('have.value', 'Lady Young')
    .get('input[name="birthday"]').type('1998-04-04')
    cy.should('have.value', '1998-04-04')
    cy.get('.next-page').click()
    cy.wait('@zodiacPost')
    window.localStorage.setItem('user', JSON.stringify({ name: 'Lady Young', birthday: '1998-04-04', sign:'Aries', icon:'https://u.cubeupload.com/User713646/Screenshot20230802at.png'}));
    cy.visit('http://localhost:3000/match')
    cy.location('pathname').should('eq', '/match')
    cy.get('.user-container').find('p').last().contains('Aries')
  })
})