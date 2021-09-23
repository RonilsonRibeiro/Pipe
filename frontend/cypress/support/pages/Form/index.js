import { formElements } from './elements'

const frmEl = require('./elements').formElements
 
class Form {

    accessForm(dataJson){
        cy.visit(dataJson.url)
    }

    fillForm(dataJson){
        cy.get(frmEl.inpName).type(dataJson.name)
        cy.get(frmEl.inpWhyWork).type(dataJson.whyWork)
        cy.get(frmEl.chkCheckOption).click().get(frmEl.chkCheckBox).check(dataJson.checkOption)
        cy.get(frmEl.lnkSelectUser).click().get(frmEl.inpMemberFilter).type(dataJson.userResponsible)
        cy.get(frmEl.lstUserList).each(($el) => {
            if ($el.text() === dataJson.userResponsible) {
              cy.wrap($el).click()
            }
        })
        cy.get(frmEl.frmMainForm).click()
        cy.get(frmEl.inpDateTime).click().get(frmEl.btnSave).click()
        cy.get(frmEl.slcOptions).select(dataJson.selectOption)
        //Take local time
        const now = new Date().toLocaleTimeString()
        cy.get(frmEl.inpLocalTime).type(now)
        cy.get(frmEl.lnkAttachFile).attachFile(dataJson.fileName, { subjectType: 'drag-n-drop' })
        cy.get(frmEl.slcFlag).click().type(dataJson.phoneCountryFilter)
        cy.get(frmEl.slcCountry).each(($el) => {
            if ($el.text() === dataJson.phoneNameCode) {
              cy.wrap($el).click()
            }
        })
        cy.get(frmEl.inpPhoneNumber).type(dataJson.phoneNumber)
        cy.get(frmEl.btnSubmit, { timeout: 20000 }).should('be.enabled');
        cy.get(frmEl.btnSubmit).click()
    }

    fillCreatorEmail(dataJson){
        cy.get(frmEl.inpCreatorEmail, { timeout: 10000 }).should('be.visible');
        cy.get(frmEl.inpCreatorEmail).type(dataJson.email)
        cy.get(frmEl.btnSendEmail).click() 
    }
}

export default new Form()