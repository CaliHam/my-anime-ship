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

