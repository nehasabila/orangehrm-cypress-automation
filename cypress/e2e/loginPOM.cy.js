import loginPage from "../support/loginPage";
import loginData from "../fixtures/loginData.json";

describe('SC_LG_001 Login Feature with POM', () => {

    beforeEach(() => {
        loginPage.visitURL();
    });

    // intercept 1
    it("TC_LG_001 Login with valid username and password", () => {
        loginPage.inputUsername(loginData.usernameValid);
        loginPage.inputPassword(loginData.passwordValid);
        loginPage.interceptShortcuts();
        loginPage.clickLogin();
        loginPage.verifyShortcutsStatus();                 
        loginPage.verifyDashboardPage();
    });

    // intercept 2
    it("TC_LG_002 Login with invalid username and valid password", () => {
        loginPage.inputUsername(loginData.usernameInvalid);
        loginPage.inputPassword(loginData.passwordValid);
        loginPage.interceptInvalidMessages();
        loginPage.clickLogin();
        loginPage.getAlertMessage(loginData.invalidMessage);
        loginPage.verifyInvalidMessagesStatus();
        loginPage.verifyLoginPage();
    });

    it("TC_LG_003 Login with valid username and invalid password", () => {
        loginPage.inputUsername(loginData.usernameValid);
        loginPage.inputPassword(loginData.passwordInvalid);
        loginPage.clickLogin();
        loginPage.getAlertMessage(loginData.invalidMessage);
        loginPage.verifyLoginPage();
    });

    // intercept 3
    it("TC_LG_004 Login with empty username and valid password", () => {
        loginPage.inputPassword(loginData.passwordValid);
        loginPage.interceptActionSummary();
        loginPage.clickLogin();
        loginPage.verifyNoActionSummaryRequest();
        loginPage.getErrorMessage(loginData.requiredMessage);
        loginPage.verifyLoginPage();
    });

    it("TC_LG_005 Login with valid username and empty password", () => {
        loginPage.inputUsername(loginData.usernameValid);
        loginPage.clickLogin();
        loginPage.getErrorMessage(loginData.requiredMessage);
        loginPage.verifyLoginPage();
    });

    // intercept 4
    it("TC_LG_006 Login without entering username and password", () => {
       loginPage.interceptWorkingTime();
       loginPage.clickLogin();
       loginPage.verifyNoWorkingTimeRequest();
       loginPage.getErrorMessage(loginData.requiredMessage);
       loginPage.verifyLoginPage();
    });

     // intercept 5
     it("TC_LG_007 Username with different letter cases", () => {
        loginPage.inputUsername(loginData.upperCaseUsername);
        loginPage.inputPassword(loginData.passwordInvalid);
        loginPage.interceptLocations();
        loginPage.clickLogin();
        loginPage.verifyLocationsStatus();
        loginPage.verifyDashboardPage();
    });

     // intercept 6
     it("TC_LG_008 Login using incorrect password case", () => {
        loginPage.inputUsername(loginData.usernameValid);
        loginPage.inputPassword(loginData.uppercasePassword);
        loginPage.interceptSubUnit();
        loginPage.clickLogin();
        loginPage.verifyNoSubUnitRequest();
        loginPage.getAlertMessage(loginData.invalidMessage);
        loginPage.verifyLoginPage();
    });

    // intercept 7
    it("TC_LG_009 Login with a username that starts with a space", () => {
        loginPage.inputUsername(loginData.usernameSpace);
        loginPage.inputPassword(loginData.passwordValid);
        loginPage.interceptFeed();
        loginPage.clickLogin();
        loginPage.verifyNoFeedRequest();
        loginPage.getAlertMessage(loginData.invalidMessage);
        loginPage.verifyLoginPage();
    });

     // intercept 8
     it("TC_LG_010 Open 'Forgot your password?' page", () => {
        loginPage.interceptResetMessages();
        loginPage.clickForgotPassword();
        loginPage.verifyResetMessagesStatus()
        loginPage.verifyResetPasswordPage();
    });

    it("TC_LG_011 Reset password without entering username", () => {
        loginPage.clickForgotPassword();
        loginPage.clickResetPassword();
        loginPage.getErrorMessage(loginData.requiredMessage);
        loginPage.verifyResetPasswordPage();
    });

    it("TC_LG_012 Cancel password reset process", () => {
        loginPage.clickForgotPassword();
        loginPage.clickCancelPasswordReset();
        loginPage.verifyLoginPage();
    });
});
