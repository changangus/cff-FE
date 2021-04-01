describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit('/')
    cy.wait(500)
    cy.contains('Hello World')
    cy.contains('Login / Register').click()
    cy.get('.MuiDialog-container').as('popup')
    cy.get('@popup').should('be.visible')
    cy.get('@popup').get('form').should('be.visible')
  })
})