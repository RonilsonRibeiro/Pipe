import Form from '../support/pages/Form'
import Verification from '../support/pages/Verification'

describe('Form', function () {
    before(function () {
        cy.fixture('testdata').then(function (dataJson) {
            this.dataJson = dataJson
        })
    })
    
    it.only('Fill the form with propper information', function () { 
        Form.accessForm(this.dataJson)
        Form.fillForm(this.dataJson)
        Form.fillCreatorEmail(this.dataJson)
        // Validates the final message
        Verification.validation(this.dataJson)
    })
  })