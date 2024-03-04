Cypress.Commands.add('startLogin', (username) => {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('url_api')}/pub/authentication/startlogin`,
      headers: {},
      form: true,
      body: {
        accountName: `${Cypress.env('accountName')}`,
        scope: `${Cypress.env('accountName')}`,
        returnUrl: Cypress.env('url'),
        callbackUrl: `${Cypress.env('url_api')}/oauth/finish?popup=false`,
        user: username,
        fingerprint: '',
      },
    })
    .then((response) => {
      const vssCookie = response.headers['set-cookie']
        .find((cookie) => cookie.startsWith('_vss='))
        .split(';')[0]

      return vssCookie
    })
})

// Comando personalizado para validar as credenciais
Cypress.Commands.add('validateCredentials', (username, password, vssCookie) => {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('url_api')}/pub/authentication/classic/validate`,
      headers: {
        Cookie: `cookieName=${vssCookie}`,
      },
      form: true,
      body: {
        login: username,
        password: password,
      },
    })
    .then((validateResponse) => {
      const authCookie = validateResponse.body.authCookie
      const authToken = authCookie.Value

      return authToken
    })
})

// Comando personalizado para gerar e validar o token
Cypress.Commands.add('generateAndValidateToken', (username, password) => {
  return cy.startLogin(username).then((vssCookie) => {
    return cy.validateCredentials(username, password, vssCookie)
  })
})