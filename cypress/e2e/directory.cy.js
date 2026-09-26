import loginPage from "../support/loginPage";
import directoryPage from "../support/directoryPage";
import directoryData from "../fixtures/directoryData.json";

describe('SC_DIR_001 Employee Directory Feature', () => {

    beforeEach(() => {
        loginPage.login();
    });
    
    it('TC_DIR_001 Open the Directory menu', () => {
        directoryPage.interceptEmployees();
        directoryPage.clickDirectoryMenu();
        directoryPage.verifyDirectoryPage();
        directoryPage.verifyEmployeesStatus();
    });

    it('TC_DIR_002 View employee directory list', () => {
        directoryPage.interceptEmployees();
        directoryPage.clickDirectoryMenu();
        directoryPage.verifyDirectoryPage();
        directoryPage.verifyEmployeesStatus();
        directoryPage.employeesList();
    });

    it('TC_DIR_003 Search with only a valid Employee name', () => {
        directoryPage.clickDirectoryMenu();
        directoryPage.verifyDirectoryPage();
        directoryPage.interceptSearchName();
        directoryPage.searchEmployeeName(directoryData.employeeNameValid);
        directoryPage.verifyEmployeeName(directoryData.employeeNameValid);
        directoryPage.verifySearchNameStatus();
    });

    it('TC_DIR_004 Search employee with only a job title', () => {
        directoryPage.clickDirectoryMenu();
        directoryPage.verifyDirectoryPage();
        directoryPage.interceptSearchJobTitle();
        directoryPage.searchJobTitle(directoryData.jobTitle);
        directoryPage.clickSearchButton();
        directoryPage.verifyJobTitle(directoryData.jobTitle);
        directoryPage.verifyJobTitleStatus();
    });

    it('TC_DIR_005 Search employee with only a location', () => {
        directoryPage.clickDirectoryMenu();
        directoryPage.verifyDirectoryPage();
        directoryPage.interceptLocation();
        directoryPage.searchLocation(directoryData.location)
        directoryPage.clickSearchButton();
        directoryPage.verifyLocation(directoryData.location);
        directoryPage.verifyLocationStatus();
    });

    it('TC_DIR_006 Search with a name that does not exist', () => {
        directoryPage.clickDirectoryMenu();
        directoryPage.verifyDirectoryPage();
        directoryPage.interceptSearchName();
        directoryPage.searchEmployeeName(directoryData.employeeNameInvalid);
        directoryPage.verifyEmployeeNameInvalid();
        directoryPage.verifySearchNameStatus();
    });

    it('TC_DIR_007 Search without entering any criteria', () => {
        directoryPage.clickDirectoryMenu();
        directoryPage.verifyDirectoryPage();
        directoryPage.interceptEmployees();
        directoryPage.clickSearchButton();
        directoryPage.verifyEmployeesStatus();
        directoryPage.employeesList();
    });

    it('TC_DIR_008 Search using multiple filters', () => {
        directoryPage.clickDirectoryMenu();
        directoryPage.verifyDirectoryPage();
        directoryPage.interceptSearchName();
        directoryPage.searchEmployeeName(directoryData.employeeNameValid);
        directoryPage.searchJobTitle(directoryData.jobTitle);
        directoryPage.searchLocation(directoryData.location);
        directoryPage.clickSearchButton();
        directoryPage.verifyEmployeeName(directoryData.employeeNameValid);
        directoryPage.verifyJobTitle(directoryData.jobTitle);
        directoryPage.verifyLocation(directoryData.location);
        directoryPage.verifySearchNameStatus();
    });

    it('TC_DIR_009 Reset directory search filters', () => {
        directoryPage.clickDirectoryMenu();
        directoryPage.verifyDirectoryPage();
        directoryPage.searchEmployeeName(directoryData.employeeNameValid);
        directoryPage.searchJobTitle(directoryData.jobTitle);
        directoryPage.searchLocation(directoryData.location);
        directoryPage.clickResetButton();
        directoryPage.verifyFiltersReset();
    });

    it('TC_DIR_010 Open employee details', () => {
        directoryPage.clickDirectoryMenu();
        directoryPage.verifyDirectoryPage();
        directoryPage.interceptDetailed();
        directoryPage.clickEmployeeDetails();
        directoryPage.verifyDetailedStatus();
        directoryPage.verifyEmployeeDetailsCard();
    });

    it('TC_DIR_011 Verify employee valid details informations', () => {
        directoryPage.clickDirectoryMenu();
        directoryPage.verifyDirectoryPage();
        directoryPage.interceptDetailed();
        directoryPage.clickEmployeeDetailsValid(directoryData.employeeNameValid);
        directoryPage.verifyDetailedStatus();
        directoryPage.verifyEmployeeValidDetails();
    });

    it('TC_DIR_012 Verify Location dropdown options', () => {
        directoryPage.clickDirectoryMenu();
        directoryPage.verifyDirectoryPage();
        directoryPage.verifyLocationDropdown();
    });

})