describe('View Details Button', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    
    // Wait for countries to load,ensure the grid is visible and contains items
    cy.get('[data-testid=country-grid]', { timeout: 50000 }).should('be.visible')

    cy.get('[data-testid=country-card]', { timeout: 10000 }).should('exist')
  })

  it('should navigate to country details when View Details button is clicked', () => {
    // Get the first country card,ensure it exists before proceeding

    cy.get('[data-testid=country-card]').should('have.length.at.least', 1)
    cy.get('[data-testid=country-card]').first().as('firstCountry')
    
    // Get the country name for verification

    cy.get('@firstCountry').find('[data-testid=country-name]').should('exist').invoke('text').as('countryName')
    
    // Get the country code from the Link URL

    cy.get('@firstCountry').invoke('attr', 'href').then(href => {
      const countryCode = href.split('/').pop()
      
      // Click on the View Details button - ensure it exists first

      cy.get('@firstCountry').find('[data-testid=view-details-button]').should('exist').click()
      
      // Verify URL has changed to country details page

      cy.url().should('include', `/country/${countryCode}`)
      
      cy.get('@countryName').then(countryName => {
        cy.contains('h1', countryName.trim(), { timeout: 10000 }).should('be.visible')
      })
      
      
      cy.contains('Capital:', { timeout: 10000 }).should('be.visible')
      cy.contains('Region:', { timeout: 10000 }).should('be.visible')
      cy.contains('Population:', { timeout: 10000 }).should('be.visible')
    })
  })

  it('should have proper styling for the View Details button', () => {
    // Select the first country card View Details button
    
    cy.get('[data-testid=country-card]').should('have.length.at.least', 1)
    cy.get('[data-testid=country-card]').first()
      .find('[data-testid=view-details-button]')
      .should('exist')
      .as('button')
    
    // Check button has proper styling
    cy.get('@button').should('have.class', 'bg-blue-600')
    cy.get('@button').should('have.class', 'text-white')
    cy.get('@button').should('have.class', 'rounded-lg')
  })
})