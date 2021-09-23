import { verificationElements } from './elements'

const vrEl = require('./elements').verificationElements
 
class Verification {

    validation(dataJson){
        cy.get(vrEl.txtFinalText, { timeout: 10000 }).should('be.visible');
        cy.get(vrEl.txtFinalText).should(($p) => {
            expect($p).to.contains.text(dataJson.formSubmitValidation)
            expect($p).to.contains.text(dataJson.email)
        })
    }
}

export default new Verification()