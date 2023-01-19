describe("login", () => {
  const baseUrl = "https://jonaslod.github.io";
  beforeEach(() => {
    cy.visit(`${baseUrl}/social-media-client/`);
    cy.wait(500);
    cy.get("#registerForm .btn-close").click();
    cy.get(`header button[data-auth="login"]`).click();
    cy.wait(500);
    cy.get("#loginForm #loginEmail").type("workflowca@stud.noroff.no");
  });
  it("can log in with the login form with valid credentials", () => {
    cy.get("#loginForm #loginPassword").type("12345678");
    cy.get(`#loginForm button[type="submit"]`).click();
    cy.url().should("include", "/?view=profile");
    cy.getAllLocalStorage().then((storage) =>
      expect(storage[`${baseUrl}`].token).to.have.length.greaterThan(1)
    );
  });
  it("cannot submit the login form with invalid credentials and is shown a message", () => {
    cy.get("#loginForm #loginPassword").type("12345679");
    cy.on("window:alert", (alert) =>
      expect(alert).to.equal(
        "Either your username was not found or your password is incorrect"
      )
    );
    cy.get(`#loginForm button[type="submit"]`).click();
  });
});
