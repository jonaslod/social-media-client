describe("logout", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(500);
    cy.get("#registerForm .btn-close").click();
    cy.get(`header button[data-auth="login"]`).click();
    cy.wait(500);
    cy.get("#loginForm #loginEmail").type("workflowca@stud.noroff.no");
    cy.get("#loginForm #loginPassword").type("12345678");
    cy.get(`#loginForm button[type="submit"]`).click();
  });
  it("can log out with the logout button", () => {
    cy.url().should("include", "/?view=profile");
    cy.get(`header button[data-auth="logout"]`).click();
    cy.getAllLocalStorage().then((storage) =>
      expect(JSON.stringify(storage)).to.equal(JSON.stringify({}))
    );
  });
});
