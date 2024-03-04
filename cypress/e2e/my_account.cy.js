describe('Acessar a home já logado via API', () => {
  let authToken;

  before(() => {
    cy.generateAndValidateToken(Cypress.env('user_name'), Cypress.env('user_password'))
      .then((token) => {
        authToken = token;
      });
  });

  beforeEach(() => {
    cy.setCookie(Cypress.env('cookie_name'), authToken);
  });

  it('Deve acessar a home', () => {
    cy.visit(Cypress.env('my_account'));
    
  });
});
