// ***********************************************
console.log('✅ Loaded commands.js');


// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
// cypress/support/commands.js

Cypress.Commands.add('getAuthToken', () => {
  cy.request({
    method: 'POST',
    url: '/auth/login', 
    body: {
      username: Cypress.env('admin').username,
      password: Cypress.env('admin').password
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    const token = response.body.access_token;
    Cypress.env('token', token);
    return token;
  });
});

Cypress.Commands.add('sendEmailRequest', (token, body) => {
  return cy.request({
    method: 'POST',
    url: Cypress.env('sendEmail'),  
    headers: { Authorization: `Bearer ${token}` },
    body,
    failOnStatusCode: false   
  });
});


// Then in your test, you can call:
// beforeEach(() => {
//   cy.loginAndGetToken().then(token => {
//     authToken = token;
//   });
// });
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })