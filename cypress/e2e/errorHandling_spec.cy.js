describe('500 error', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/characters', {
      statusCode: 500,
    })
  })
  it('Should show 500 error image when servers are down', () => {
    cy.visit('http://localhost:3000')
    cy.get('[alt="500 Error: Server Down"]')
  })
})