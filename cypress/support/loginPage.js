class loginPage{
    visitURL(){
        cy.visit( "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    }

    inputUsername(username){
        cy.get('[name="username"]').type(username);
    }

    inputPassword(password){
        cy.get('[name="password"]').type(password);
    }

    clickLogin(){
        cy.get(".oxd-button").click();
    }

    //verify page
    verifyLoginPage() {
        cy.url().should("include", "/auth/login");
    }

    verifyDashboardPage() {
        cy.url().should("include", "/dashboard/index");
    }

    verifyResetPasswordPage() {
        cy.url().should(
            "include",
            "/auth/requestPasswordResetCode"
        );
    }

    //message
    getAlertMessage(alertmessage){
        cy.get(".oxd-alert-content").should("contain", alertmessage);
    }

    getErrorMessage(errormessage){
        cy.get(".oxd-input-field-error-message").should("contain", errormessage);
    }

    //reset password
    clickForgotPassword() {
        cy.contains('Forgot your password?').click();
    }

    clickResetPassword() {
        cy.get('.orangehrm-forgot-password-button--reset').click();
    }

    clickCancelPasswordReset() {
        cy.get('.orangehrm-forgot-password-button--cancel').click();
    }

    //intercept
    interceptShortcuts() {
        cy.intercept(
            "GET",
            "**/api/v2/dashboard/shortcuts"
        ).as("shortcuts");
    }

    interceptInvalidMessages() {
        cy.intercept(
            "GET",
            "**/core/i18n/messages"
        ).as("messagesInvalid");
    }

    interceptActionSummary() {
        cy.intercept(
            "GET",
            "**/api/v2/dashboard/employees/action-summary"
        ).as("actionSummary");
    }

    interceptWorkingTime() {
        cy.intercept(
            "GET",
            "**/api/v2/dashboard/employees/time-at-work?**"
        ).as("workingTime");
    }

    interceptLocations() {
        cy.intercept(
            "GET",
            "**/api/v2/dashboard/employees/locations"
        ).as("locations");
    }

    interceptSubUnit() {
        cy.intercept(
            "GET",
            "**/api/v2/dashboard/employees/subunit"
        ).as("subUnit");
    }

    interceptFeed() {
        cy.intercept(
            "GET",
            "**/api/v2/buzz/feed?**"
        ).as("feed");
    }

    interceptResetMessages() {
        cy.intercept(
            "GET",
            "**/core/i18n/messages"
        ).as("messagesReset");
    }

    //intercept assertion
    verifyShortcutsStatus() {
        cy.wait("@shortcuts")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifyInvalidMessagesStatus() {
        cy.wait("@messagesInvalid")
            .its("response.statusCode")
            .should("eq", 304);
    }

    verifyResetMessagesStatus() {
        cy.wait("@messagesReset")
            .its("response.statusCode")
            .should("eq", 304);
    }

    verifyNoActionSummaryRequest() {
        cy.get("@actionSummary.all")
            .should("have.length", 0);
    }

    verifyNoWorkingTimeRequest() {
        cy.get("@workingTime.all")
            .should("have.length", 0);
    }

    verifyLocationsStatus() {
        cy.wait("@locations")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifyNoSubUnitRequest() {
        cy.get("@subUnit.all")
            .should("have.length", 0);
    }

    verifyNoFeedRequest() {
        cy.get("@feed.all")
            .should("have.length", 0);
    }

}

export default new loginPage()