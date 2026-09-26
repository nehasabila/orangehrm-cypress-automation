class recruitmentPage{

    clickRecruitmentMenu(){
        cy.contains('Recruitment').click();
    }

    verifyRecruitmentPage() {
        cy.url().should("include", "/recruitment/viewCandidates");
    }

    candidatesList() {
        cy.contains('Records Found').should('be.visible')
    }

    clickCandidateDetails() {
        cy.get('.bi-eye-fill').first().click();
    }

    clickVacanciesTab() {
        cy.contains('Vacancies').click();
    }

    verifyCandidateDetailsPage() {
        cy.url().should("include", "/recruitment/addCandidate");
    }

    verifyAddCandidatePage() {
        cy.url().should("include", "/recruitment/addCandidate");
    }

    verifyVacanciesPage() {
        cy.url().should("include", "/recruitment/viewJobVacancy");
    }


    // search filter
    searchCandidateName(candidateName) {
        cy.get('input[placeholder="Type for hints..."]').type(candidateName);
    }

    searchJobTitle(jobTitle) {
        cy.get('.oxd-select-text').eq(0).click();
        cy.contains(jobTitle).click();
    }

    searchVacancy(vacancy) {
        cy.get('.oxd-select-text').eq(1).click();
        cy.contains(vacancy).click();
    }

    searchStatus(status) {
        cy.get('.oxd-select-text').eq(3).click();
        cy.contains(status).click();
    }

    // button
    clickSearchButton() {
        cy.contains('button', 'Search').click();
    }

    clickResetButton() {
        cy.contains('button', 'Reset').click();
    }

    clickAddButton() {
        cy.contains('button', 'Add').click();
    }

    clickSaveButton() {
        cy.contains('button', 'Save').click();
    }

    // add candidate
    addCandidateFirstName(candidateFirstName) {
        cy.get('input[placeholder="First Name"]').type(candidateFirstName);
    }

    addCandidateLastName(candidateLastName) {
        cy.get('input[placeholder="Last Name"]').type(candidateLastName);
    }

    addVacancy(vacancy) {
        cy.get('.oxd-select-text').eq(0).click();
        cy.contains(vacancy).click();
    }

    addEmail(email) {
        cy.get('input[placeholder="Type here"]').eq(0).type(email);
    }

    addContactNumber(ContactNumber) {
        cy.get('input[placeholder="Type here"]').eq(1).type(ContactNumber);
    }

    // add vacancy
    addVacancyName(vacancyname) {
        cy.get('.oxd-input-group').eq(0).type(vacancyname);
    }

    addJobTitle(jobtitle) {
        cy.get('.oxd-select-text').eq(0).click();
        cy.contains(jobtitle).click();
    }

    addHiringManager(hiringmanager) {
        cy.get('input[placeholder="Type for hints..."]').type(hiringmanager);
    }

    // verify
    verifyCandidateName(candidateName) {
        cy.contains(candidateName).should('be.visible');
    }

    verifyJobTitle(jobTitle) {
        cy.contains(jobTitle).should('be.visible');
    }

    verifyVacancy(vacancy) {
        cy.contains(vacancy).should('be.visible');
    }

    verifyStatus(status) {
        cy.contains(status).should('be.visible');
    }

    verifyFiltersReset() {
        cy.get('input[placeholder="Type for hints..."]')
            .should('have.value', '');
    
        cy.get('.oxd-select-text-input')
            .each(($el) => {
                cy.wrap($el).should('contain.text', '-- Select --');
            });
    }

    //intercept
    interceptCandidates() {
        cy.intercept(
            "GET",
            "**/api/v2/recruitment/candidates**"
        ).as("cadidates");
    }

    interceptSearchCandidateName() {
        cy.intercept(
            "GET",
            "**/api/v2/recruitment/candidates?candidateName=**"
        ).as("searchCandidateName");
    }

    interceptSearchJobTitle() {
        cy.intercept(
            "GET",
            "**/api/v2/admin/job-titles?**"
        ).as("searchJobTitle");
    }

    interceptSearchVacancy() {
        cy.intercept(
            "GET",
            "**/api/v2/recruitment/vacancies?**"
        ).as("searchVacancy");
    }

    interceptSearchStatus() {
        cy.intercept(
            "GET",
            "**/api/v2/recruitment/candidates?**&status=**"
        ).as("searchStatus");
    }

    interceptAllowed() {
        cy.intercept(
            "GET",
            "**/api/v2/recruitment/candidates/**/actions/allowed"
        ).as("allowed");
    }

    interceptMessage() {
        cy.intercept(
            "GET",
            "**/core/i18n/messages"
        ).as("message");
    }

    interceptVacancies() {
        cy.intercept(
            "GET",
            "**/api/v2/recruitment/vacancies**"
        ).as("vacancies");
    }

    interceptUniqueValue() {
        cy.intercept(
            "GET",
            "**/api/v2/core/validation/unique**"
        ).as("uniquevalue");
    }
    

    // intercept assertion
    verifyCandidatesStatus() {
        cy.wait("@cadidates")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifySearchCandidateNameStatus() {
        cy.wait("@searchCandidateName")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifySearchJobTitleStatus() {
        cy.wait("@searchJobTitle")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifySearchVacancyStatus() {
        cy.wait("@searchVacancy")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifySearchStatusStatus() {
        cy.wait("@searchStatus")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifyAllowedStatus() {
        cy.wait("@allowed")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifyMessageStatus() {
        cy.wait("@message")
            .its("response.statusCode")
            .should("eq", 304);
    }

    verifyVacanciesStatus() {
        cy.wait("@vacancies")
            .its("response.statusCode")
            .should("eq", 200);
    }

    verifyUniqueValueStatus() {
        cy.wait("@uniquevalue")
            .its("response.statusCode")
            .should("eq", 200);
    }
}

export default new recruitmentPage()