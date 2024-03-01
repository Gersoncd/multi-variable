describe('acess home', () => {
  it('home', () => {
    cy.visit(Cypress.env('url'))
  })
})