describe('Country Navigation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        
        // Waiting
        cy.get('[data-testid=country-grid]', { timeout: 50000 }).should('be.visible')
    })

    it('should expand dropdown when clicked', () => {
        // Find the region filter dropdown
        cy.get('[data-testid=region-filter]').should('be.visible')
        
        // Initially dropdown options should be hidden
        cy.get('[data-testid=region-options]').should('not.be.visible')
        
        // Click on the region filter dropdown
        cy.get('[data-testid=region-filter]').click()
        
        // Verify dropdown options are now visible
        cy.get('[data-testid=region-options]').should('be.visible')
        
        // Verify that dropdown contains region options
        cy.get('[data-testid=region-option]').should('have.length.at.least', 5)
        
        // Verify specific regions are present
        cy.get('[data-testid=region-options]').within(() => {
            cy.contains('Africa').should('exist')
            cy.contains('Americas').should('exist')
            cy.contains('Asia').should('exist')
            cy.contains('Europe').should('exist')
            cy.contains('Oceania').should('exist')
        })
    })
})