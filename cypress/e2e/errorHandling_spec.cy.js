describe('500 error', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.intercept('GET', 'https://my-anime-ship-api.onrender.com/api/v1/characters', {
      statusCode: 500,
    })
    cy.visit('http://localhost:3000')
  })
  it('Should show 500 error image when servers are down', () => {
    cy.get('[alt="500 Error: Server Down"]')
    .get('.nav-logo').click()
    cy.location('pathname').should('eq', '/match')
    cy.get('[alt="500 Error: Server Down"]')
    cy.get('.saved-link').click()
    cy.location('pathname').should('eq', '/savedreports')
    cy.get('[alt="500 Error: Server Down"]')
  })
})

describe('400 error', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://my-anime-ship-api.onrender.com/api/v1/characters', {
      statusCode: 200,
      fixture: 'allCharacters',
    })
  })
  it('Should show 400 error image page is not found', () => {
    cy.visit('http://localhost:3000/potato')
    cy.get('[alt="404 Error: Page Not Found"]')
    cy.visit('http://localhost:3000/match/potato')
    cy.get('[alt="404 Error: Page Not Found"]')
    cy.visit('http://localhost:3000/savedreports/potato')
    cy.get('[alt="404 Error: Page Not Found"]')
  })
})

describe('User verification', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://my-anime-ship-api.onrender.com/api/v1/characters', {
      statusCode: 200,
      fixture: 'allCharacters',
    })
  })
  it('Should show error message when form is not filled out', () => {
    cy.visit('http://localhost:3000/')
    cy.get('input[name="name"]').type('Lady Young')
    cy.get('.next-page').click()
    cy.get('.form-error').should('have.text', 'Please fill out form completely!')
    cy.get('input[name="name"]').clear()
    cy.get('input[name="birthday"]').type('1998-04-04')
    cy.get('.next-page').click()
    cy.get('.form-error').should('have.text', 'Please fill out form completely!')
  })
  it('Should show error message when man is not selected', () => {
    cy.intercept('GET', 'https://my-anime-ship-api.onrender.com/api/v1/characters/6', {
      statusCode: 200,
      fixture: 'chosenCharacter',
    })
    window.localStorage.setItem('user', JSON.stringify({ name: 'Lady Young', birthday: '1998-04-04', sign:'Aries', icon:'https://u.cubeupload.com/User713646/Screenshot20230802at.png'}));
    cy.visit('http://localhost:3000/match')
    .get('h1').should('have.text', 'Pick Your Match')
    .get('.classic-button').last().click()
    cy.get('.form-error').should('have.text', 'Please select your love interest!')
  })
})