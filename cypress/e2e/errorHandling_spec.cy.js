describe('500 error', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/characters', {
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
    cy.intercept('GET', 'http://localhost:3001/api/v1/characters', {
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
    cy.intercept('GET', 'http://localhost:3001/api/v1/characters', {
      statusCode: 200,
      fixture: 'allCharacters',
    })
  })
  it('Should show error message when form is not filled out', () => {
    cy.visit('http://localhost:3000/')
    cy.get('input[name="name"]').type('Lady Young')
    cy.get('.next-page').click()
    cy.get('.form-error').contains('Please fill out form completely!')
    cy.get('input[name="name"]').clear()
    cy.get('input[name="birthday"]').type('1998-04-04')
    cy.get('.next-page').click()
    cy.get('.form-error').contains('Please fill out form completely!')
  })
})