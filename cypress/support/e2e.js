import "./commands";
import "cypress-plugin-xhr-toggle";
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
