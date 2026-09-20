describe('SC_LG_001 Login Feature', () => {
  const loginUrl =
  "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  beforeEach(() => {
  cy.visit(loginUrl);
  });

  it("TC_LG_001 Login with valid username and password", () => {
      cy.get('[name="username"]').type("Admin");
      cy.get('[name="password"]').type("admin123");
      cy.get(".oxd-button").click();
      cy.url().should("include", "/dashboard/index");
  });

  it("TC_LG_002 Login with invalid username and valid password", () => {
      cy.get('[name="username"]').type("NewAdmin");
      cy.get('[name="password"]').type("admin123");
      cy.get(".oxd-button").click();
      cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
      cy.url().should("include", "/auth/login");
  });

  it("TC_LG_003 Login with valid username and invalid password", () => {
      cy.get('[name="username"]').type("Admin");
      cy.get('[name="password"]').type("Pass123");
      cy.get(".oxd-button").click();
      cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
      cy.url().should("include", "/auth/login");
  });

  it("TC_LG_004 Login with empty username and valid password", () => {
      cy.get('[name="password"]').type("admin123");
      cy.get(".oxd-button").click();
      cy.get(".oxd-input-field-error-message").should("contain", "Required");
      cy.url().should("include", "/auth/login");
  });

  it("TC_LG_005 Login with valid username and empty password", () => {
      cy.get('[name="username"]').type("Admin");
      cy.get(".oxd-button").click();
      cy.get(".oxd-input-field-error-message").should("contain", "Required");
      cy.url().should("include", "/auth/login");
  });

  it("TC_LG_006 Login without entering username and password", () => {
      cy.get(".oxd-button").click();
      cy.get(".oxd-input-field-error-message").should("contain", "Required");
      cy.url().should("include", "/auth/login");
  });

  it("TC_LG_007 Username with different letter cases", () => {
      cy.get('[name="username"]').type("ADMIN");
      cy.get('[name="password"]').type("admin123");
      cy.get(".oxd-button").click();
      cy.url().should("include", "/dashboard/index");
  });

  it("TC_LG_008 Login using incorrect password case", () => {
      cy.get('[name="username"]').type("Admin");
      cy.get('[name="password"]').type("ADMIN123");
      cy.get(".oxd-button").click();
      cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
      cy.url().should("include", "/auth/login");
  });

  it("TC_LG_009 Login with a username that starts with a space", () => {
      cy.get('[name="username"]').type(" Admin");
      cy.get('[name="password"]').type("admin123");
      cy.get(".oxd-button").click();
      cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
      cy.url().should("include", "/auth/login");
  });

  it("TC_LG_010 Open 'Forgot your password?' page", () => {
      cy.contains('Forgot your password?').click();
      cy.url().should("include", "/auth/requestPasswordResetCode");
  });

  it("TC_LG_011 Reset password without entering username", () => {
      cy.contains('Forgot your password?').click();
      cy.get('.orangehrm-forgot-password-button--reset').click();
      cy.get(".oxd-input-field-error-message").should("contain", "Required");
      cy.url().should("include", "/auth/requestPasswordResetCode");
  });

  it("TC_LG_012 Cancel password reset process", () => {
      cy.contains('Forgot your password?').click();
      cy.get('.orangehrm-forgot-password-button--cancel').click();
      cy.url().should("include", "/auth/login");
  });
})