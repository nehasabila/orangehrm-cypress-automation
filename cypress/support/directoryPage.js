import directoryData from "../fixtures/directoryData.json";
class directoryPage{
    clickDirectoryMenu(){
        cy.contains('Directory').click();
    }

    verifyDirectoryPage() {
        cy.url().should("include", "/directory/viewDirectory");
    }

    employeesList() {
        cy.contains('Records Found').should('be.visible')
    }

    // search filter
    searchEmployeeName(employeeName) {
        cy.get('input[placeholder="Type for hints..."]').type(employeeName);
    }

    searchJobTitle(jobTitle) {
        cy.get('.oxd-select-text').eq(0).click();
        cy.contains(jobTitle).click();
    }

    searchLocation(location) {
        cy.get('.oxd-select-text').eq(1).click();
        cy.contains(location).click();
    }

    // button
    clickSearchButton() {
        cy.contains('button', 'Search').click();
    }

    clickResetButton() {
        cy.contains('button', 'Reset').click();
    }

    clickEmployeeDetails() {
        cy.get('.orangehrm-directory-card').first().click();
    }

    clickEmployeeDetailsValid(employeeName) {
        cy.get('.orangehrm-directory-card').contains(employeeName).should('be.visible').click();
    }

    // verify
    verifyEmployeeName(employeeName) {
        cy.contains(employeeName).should('be.visible');

    }

    verifyJobTitle(jobTitle) {
        cy.contains(jobTitle).should('be.visible');

    }

    verifyLocation(location) {
        cy.contains(location).should('be.visible');

    }

    verifyEmployeeNameInvalid() {
        cy.contains('No Records Found').should('be.visible')

    }

    verifyFiltersReset() {
        cy.get('input[placeholder="Type for hints..."]')
            .should('have.value', '');
    
        cy.get('.oxd-select-text-input')
            .each(($el) => {
                cy.wrap($el).should('contain.text', '-- Select --');
        });
    }

    verifyEmployeeDetailsCard() {
        cy.get('.orangehrm-directory-card').should('be.visible');
    }

    verifyEmployeeValidDetails() {
        cy.contains(directoryData.employeeNameValid).should('be.visible');
        cy.contains(directoryData.jobTitle).should('be.visible');
        cy.contains(directoryData.jobTitle).should('be.visible');
    }

    verifyLocationDropdown() {
        cy.get('.oxd-select-text').eq(1).click();
        cy.get('.oxd-select-dropdown').should('be.visible');
        cy.get('.oxd-select-dropdown .oxd-select-option')
            .should('have.length.greaterThan', 1)
            .each(($option) => {
                cy.wrap($option)
                    .invoke('text')
                    .should('not.be.empty');
            });
    }

    // intercept
    interceptEmployees() {
        cy.intercept(
            "GET",
            "**/api/v2/directory/employees?limit**"
        ).as("employees");
    }

    interceptSearchName() {
        cy.intercept(
            "GET",
            "**/api/v2/directory/employees?nameOrId=**"
        ).as("searchName");
    }

    interceptSearchJobTitle() {
        cy.intercept(
            "GET",
            "**/api/v2/directory/employees?limit=**&jobTitleId=**"
        ).as("searchJobTitle");
    }

    interceptLocation() {
        cy.intercept(
            "GET",
            "**/api/v2/directory/employees?limit=**&locationId=**"
        ).as("searchLocation");
    }

    interceptDetailed() {
        cy.intercept(
            "GET",
            "**/api/v2/directory/employees/**?model=detailed"
        ).as("modelDetailed");
    }

    // intercept assertion
    verifyEmployeesStatus() {
        cy.wait("@employees")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifySearchNameStatus() {
        cy.wait("@searchName")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifyJobTitleStatus() {
        cy.wait("@searchJobTitle")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifyLocationStatus() {
        cy.wait("@searchLocation")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifyDetailedStatus() {
        cy.wait("@modelDetailed")
            .its("response.statusCode")
            .should("eq", 200);
    }

}

export default new directoryPage()