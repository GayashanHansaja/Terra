describe('Country Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    
    // Waiting
    cy.get('[data-testid=country-grid]', { timeout: 50000 }).should('be.visible')
  })

  it('should navigate to country details page when a country card is clicked', () => {
    // Get the first country card
    cy.get('[data-testid=country-card]').first().as('firstCountry')
    
    // take country name to verify
    cy.get('@firstCountry').find('[data-testid=country-name]').invoke('text').as('countryName')
    
    // Click on country card
    cy.get('@firstCountry').click()
    
    // Verify navigated to the country details page
    cy.url().should('include', '/country/')
    
    // Verify the country details page shows the correct country
    cy.get('@countryName').then((countryName) => {
      cy.get('[data-testid=country-detail-name]').should('contain', countryName)
    })
    
    // Verify detail page components are visible
    cy.get('[data-testid=country-details]').should('be.visible')
  })
})