describe('SC_LG_001 Login Feature - Intercept', () => {
    const loginUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

    beforeEach(() => {
    cy.visit(loginUrl);
    });

    // intercept 1
    it("TC_LG_001 Login with valid username and password", () => {
        cy.get('[name="username"]').type("Admin");
        cy.get('[name="password"]').type("admin123");
        
        cy.intercept(
            'GET', 
            '**/api/v2/dashboard/shortcuts').as('shortcuts');

        cy.get(".oxd-button").click();
        cy.wait('@shortcuts').its('response.statusCode').should('eq', 200);
        cy.url().should("include", "/dashboard/index");     
    });

    // intercept 2
    it("TC_LG_002 Login with invalid username and valid password", () => {
        cy.get('[name="username"]').type("NewAdmin");
        cy.get('[name="password"]').type("admin123");

        cy.intercept(
            'GET', 
            '**/core/i18n/messages').as('messagesInvalid');
        
        cy.get(".oxd-button").click();
        cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
        cy.wait('@messagesInvalid').its('response.statusCode').should('eq', 304);
        cy.url().should("include", "/auth/login");
    });

    it("TC_LG_003 Login with valid username and invalid password", () => {
        cy.get('[name="username"]').type("Admin");
        cy.get('[name="password"]').type("Pass123");
        cy.get(".oxd-button").click();
        cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
        cy.url().should("include", "/auth/login");
    });

    // intercept 3
    it("TC_LG_004 Login with empty username and valid password", () => {
        cy.get('[name="password"]').type("admin123");

        cy.intercept(
            "GET", 
            "**api/v2/dashboard/employees/action-summary").as("actionSummary");
      
        cy.get(".oxd-button").click();

        cy.get("@actionSummary.all").should("have.length", 0);

        cy.get(".oxd-input-field-error-message").should("contain", "Required");
        cy.url().should("include", "/auth/login");
    });

    it("TC_LG_005 Login with valid username and empty password", () => {
        cy.get('[name="username"]').type("Admin");
        cy.get(".oxd-button").click();
        cy.get(".oxd-input-field-error-message").should("contain", "Required");
        cy.url().should("include", "/auth/login");
    });

    // intercept 4
    it("TC_LG_006 Login without entering username and password", () => {
        cy.intercept(
            'GET',
            '**/api/v2/dashboard/employees/time-at-work?**').as("workingTime");

        cy.get(".oxd-button").click();

        cy.get("@workingTime.all").should("have.length", 0);
        
        cy.get(".oxd-input-field-error-message").should("contain", "Required");
        cy.url().should("include", "/auth/login");
    });

    // intercept 5
    it("TC_LG_007 Username with different letter cases", () => {
        cy.get('[name="username"]').type("ADMIN");
        cy.get('[name="password"]').type("admin123");

        cy.intercept(
            'GET', 
            '**/api/v2/dashboard/employees/locations').as('locations');

        cy.get(".oxd-button").click();
        cy.wait('@locations').its('response.statusCode').should('eq', 200);
    });

    // intercept 6
    it("TC_LG_008 Login using incorrect password case", () => {
        cy.get('[name="username"]').type("Admin");
        cy.get('[name="password"]').type("ADMIN123");

        cy.intercept(
            'GET', 
            '**/api/v2/dashboard/employees/subunit').as('subUnit');

        cy.get(".oxd-button").click();

        cy.get("@subUnit.all").should("have.length", 0);

        cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
        cy.url().should("include", "/auth/login");
    });

    // intercept 7
    it("TC_LG_009 Login with a username that starts with a space", () => {
        cy.get('[name="username"]').type(" Admin");
        cy.get('[name="password"]').type("admin123");

        cy.intercept(
            'GET', 
            '**/api/v2/buzz/feed?**').as('feed');

        cy.get(".oxd-button").click();

        cy.get("@feed.all").should("have.length", 0);

        cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
        cy.url().should("include", "/auth/login");
    });

    // intercept 8
    it("TC_LG_010 Open 'Forgot your password?' page", () => {

        cy.intercept(
            'GET', 
            '**/core/i18n/messages').as('messagesReset');

        cy.contains('Forgot your password?').click();
        cy.wait('@messagesReset').its('response.statusCode').should('eq', 304);
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