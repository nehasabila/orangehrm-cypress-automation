import loginPage from "../support/loginPage";
import recruitmentPage from "../support/recruitmentPage";
import recruitmentData from "../fixtures/recruitmentData.json";

describe('SC_DIR_001 Recruitment Page Feature', () => {

    beforeEach(() => {
        loginPage.login();
    });

    it('TC_REC_001 Open the Recruitment menu', () => {
        recruitmentPage.interceptCandidates();
        recruitmentPage.clickRecruitmentMenu();
        recruitmentPage.verifyCandidatesStatus();
        recruitmentPage.verifyRecruitmentPage();
    });
    
    it('TC_REC_002 View candidate list', () => {
        recruitmentPage.interceptCandidates();
        recruitmentPage.clickRecruitmentMenu();
        recruitmentPage.verifyCandidatesStatus();
        recruitmentPage.verifyRecruitmentPage();
        recruitmentPage.candidatesList();
    });
    
    it('TC_REC_003 Search candidate by only a name', () => {
        recruitmentPage.clickRecruitmentMenu();
        recruitmentPage.verifyRecruitmentPage();
        recruitmentPage.interceptSearchCandidateName();
        recruitmentPage.searchCandidateName(recruitmentData.candidateNameValid);
        recruitmentPage.verifyCandidateName(recruitmentData.candidateNameValid);
        recruitmentPage.verifySearchCandidateNameStatus();
    });

    it('TC_REC_004 Search candidate by only a job title', () => {
        recruitmentPage.clickRecruitmentMenu();
        recruitmentPage.verifyRecruitmentPage();
        recruitmentPage.interceptSearchJobTitle();
        recruitmentPage.searchJobTitle(recruitmentData.jobTitle);
        recruitmentPage.clickSearchButton();
        recruitmentPage.verifyVacancy(recruitmentData.jobTitle);
        recruitmentPage.verifySearchJobTitleStatus();
    });

    it('TC_REC_005 Search candidate by only a vacancy', () => {
        recruitmentPage.clickRecruitmentMenu();
        recruitmentPage.verifyRecruitmentPage();
        recruitmentPage.interceptSearchVacancy();
        recruitmentPage.searchVacancy(recruitmentData.vacancy);
        recruitmentPage.clickSearchButton();
        recruitmentPage.verifyVacancy(recruitmentData.vacancy);
        recruitmentPage.verifySearchVacancyStatus();
    });

    it('TC_REC_006 Search candidate by only a status', () => {
        recruitmentPage.clickRecruitmentMenu();
        recruitmentPage.verifyRecruitmentPage();
        recruitmentPage.interceptSearchStatus();
        recruitmentPage.searchStatus(recruitmentData.status);
        recruitmentPage.clickSearchButton();
        recruitmentPage.verifyStatus(recruitmentData.status);
        recruitmentPage.verifySearchStatusStatus();
    });

    it('TC_REC_007 Search candidate without entering criteria', () => {
        recruitmentPage.clickRecruitmentMenu();
        recruitmentPage.verifyRecruitmentPage();
        recruitmentPage.interceptCandidates();
        recruitmentPage.clickSearchButton();
        recruitmentPage.verifyCandidatesStatus();
    });

    it('TC_REC_008 Reset recruitment search filters', () => {
        recruitmentPage.clickRecruitmentMenu();
        recruitmentPage.verifyRecruitmentPage();
        recruitmentPage.searchCandidateName(recruitmentData.candidateNameValid);
        recruitmentPage.searchJobTitle(recruitmentData.jobTitle);
        recruitmentPage.searchVacancy(recruitmentData.vacancy);
        recruitmentPage.searchStatus(recruitmentData.status);
        recruitmentPage.clickResetButton();
        recruitmentPage.verifyFiltersReset();
    });

    it('TC_DIR_009 Open candidate details', () => {
        recruitmentPage.clickRecruitmentMenu();
        recruitmentPage.verifyRecruitmentPage();
        recruitmentPage.interceptAllowed();
        recruitmentPage.clickCandidateDetails();
        recruitmentPage.verifyAllowedStatus();
        recruitmentPage.verifyCandidateDetailsPage();
    });

    it('TC_DIR_010 Add a new candidate', () => {
        recruitmentPage.clickRecruitmentMenu();
        recruitmentPage.verifyRecruitmentPage();
        recruitmentPage.clickAddButton();
        recruitmentPage.verifyAddCandidatePage();
        recruitmentPage.addCandidateFirstName(recruitmentData.newCandidateFirstName);
        recruitmentPage.addCandidateLastName(recruitmentData.newCandidateLastName);
        recruitmentPage.addVacancy(recruitmentData.vacancy);
        recruitmentPage.addEmail(recruitmentData.email);
        recruitmentPage.addContactNumber(recruitmentData.contact);
        recruitmentPage.interceptMessage();
        recruitmentPage.clickSaveButton();
        recruitmentPage.verifyMessageStatus();
        recruitmentPage.verifyCandidateDetailsPage();
        recruitmentPage.verifyCandidateName(recruitmentData.newCandidateFirstName);
    });

    it('TC_DIR_011 Open the Vacancies tab', () => {
        recruitmentPage.clickRecruitmentMenu();
        recruitmentPage.verifyRecruitmentPage();
        recruitmentPage.interceptVacancies();
        recruitmentPage.clickVacanciesTab();
        recruitmentPage.verifyVacanciesStatus();
        recruitmentPage.verifyVacanciesPage();
    });

    it('TC_DIR_012 Add a new vacancy', () => {
        recruitmentPage.clickRecruitmentMenu();
        recruitmentPage.verifyRecruitmentPage();
        recruitmentPage.interceptVacancies();
        recruitmentPage.clickVacanciesTab();
        recruitmentPage.verifyVacanciesStatus();
        recruitmentPage.verifyVacanciesPage();
        recruitmentPage.clickAddButton();
        recruitmentPage.addVacancyName(recruitmentData.newVacancy);
        recruitmentPage.addJobTitle(recruitmentData.newJobTitle);
        recruitmentPage.addHiringManager(recruitmentData.hiringManagaer);
        recruitmentPage.interceptUniqueValue();
        recruitmentPage.clickSaveButton();
        recruitmentPage.verifyUniqueValueStatus();
    });
    
})