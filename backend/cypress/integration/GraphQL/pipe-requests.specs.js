describe('graphQL calls from create pipe to create card',  () => {
    var pipeId 
    var pipePhaseId
    let data 
     
    before(function () {
        cy.fixture('testdata').then(function (dataJson) {
            data = dataJson
        })
    }) 
    
    it('Should create a Pipe',  () => {
        const pipeInput = `
            {
                name: "${data.name}",
                organization_id: "${data.organizatioId}",
                start_form_fields: {
                    type_id: "short_text",
                    label: "${data.textFielLabel}"
                }
            }`
        
        cy.request({
            url: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+data.accessKey
            },
            body: {
                query: `
                mutation createPipe {
                    createPipe(
                    input: ${pipeInput}
                    ) {
                    clientMutationId
                    pipe {
                        name
                        id
                    }
                    }
                }`   
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.statusCode = 200)
            expect(response.body.data.createPipe.pipe.name).to.be.eq(data.name)
            pipeId = response.body.data.createPipe.pipe.id
        })   
    }) 

    it('Should query for phases ids', () => {
        cy.request({
            url: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+data.accessKey
            },
            body: {
                query: `
                { pipe(id: ${pipeId})
                {name, description, phases{id, name},start_form_fields{id, description}}}
            `   
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.statusCode = 200)
            expect(response.body.data.pipe.name).to.be.eq(data.name)
            pipePhaseId = response.body.data.pipe.phases[0].id
        })
    })

    it('Should create a new phase field', () => {
        const createPhaseInput = `
            {
                phase_id: ${pipePhaseId},
                label: "${data.TextPhasePipeLabel}",
		        type: "short_text"
            }`
        
        cy.request({
            url: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+data.accessKey
            },
            body: {
                query: `
                mutation createPhaseField {
                    createPhaseField(
                    input: ${createPhaseInput}
                    ){
                        phase_field {
                          id
                        },
                        clientMutationId
                      }
                    }`
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.statusCode = 200)
            expect(response.body.data.createPhaseField.phase_field.id).to.be.eq(data.TextPhasePipeLabel)
        })
    })

    
    it('Should create a Card',  () =>  {
        const createCardInput = `
            {
                pipe_id: ${pipeId},
                phase_id: ${pipePhaseId},
                title: "${data.cardTitle}",
                fields_attributes: {
                    field_id: "start_form_text",
                    field_value: "${data.inicialFieldValue}"
                }
            }
        `
        
        cy.request({
            url: 'https://app.pipefy.com/graphql',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+data.accessKey
            },
            body: {
                query: `
                mutation createCard{
                    createCard(input: ${createCardInput}){
                      card {
                        id
                      }
                    }
                  }
                `   
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.statusCode = 200)
            expect(response.body.data.createCard.card.id).to.be.a('string')
        })
    })



})