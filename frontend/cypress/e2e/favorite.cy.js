describe('Favorite Functionality', () => {
  beforeEach(() => {
    // Login before testing favorites
    cy.visit('http://localhost:5173/')
    
    // Open the profile menu and click on login
    cy.get('[aria-label="Toggle favorites"]').should('be.visible')
    
    // Login with test credentials
    cy.get('button').contains(/sign in/i).click({ force: true })
    cy.get('input[placeholder="Username"]').type('gayashan')
    cy.get('input[placeholder="Password"]').type('123456')
    cy.get('button').contains(/login/i).click()
    
    // Wait for authentication
    cy.wait(2000)
    
    // Go to countries list
    cy.visit('http://localhost:5173/countries')
    
    // Wait for countries to load
    cy.get('[data-testid=country-grid]', { timeout: 10000 }).should('be.visible')
    cy.get('[data-testid=country-card]', { timeout: 10000 }).should('have.length.at.least', 1)
  })
  
  it('should add a country to favorites when heart icon is clicked', () => {
    // Get the first country card
    cy.get('[data-testid=country-card]').first().as('firstCountry')
    
    // Get the country name for verification
    cy.get('@firstCountry').find('[data-testid=country-name]')
      .should('exist')
      .invoke('text')
      .as('countryName')
    
    // Find and click the heart icon (favorite button)
    cy.get('@firstCountry').find('[aria-label*="Add to favorites"]')
      .should('exist')
      .click()
    
    // Wait for the API request to complete
    cy.wait(1000)
    
    // Verify that the icon changed to filled heart
    cy.get('@firstCountry').find('[aria-label*="Remove from favorites"]')
      .should('exist')
    
    // Go to home page to check favorites list
    cy.visit('http://localhost:5173/')
    
    // Open favorites panel
    cy.get('[aria-label="Toggle favorites"]').click()
    
    // Check if the country appears in the favorites list
    cy.get('@countryName').then(countryName => {
      cy.contains(countryName.trim()).should('be.visible')
    })
  })
  
  it('should remove a country from favorites when trash icon is clicked', () => {
    // First add a country to favorites
    cy.get('[data-testid=country-card]').first().as('firstCountry')
    
    // Get the country name for verification
    cy.get('@firstCountry').find('[data-testid=country-name]')
      .should('exist')
      .invoke('text')
      .as('countryName')
    
    // Click heart icon if it's not already a favorite
    cy.get('@firstCountry').then($card => {
      if ($card.find('[aria-label*="Add to favorites"]').length > 0) {
        cy.wrap($card).find('[aria-label*="Add to favorites"]').click()
        cy.wait(1000)
      }
    })
    
    // Go to home page
    cy.visit('http://localhost:5173/')
    
    // Open favorites panel
    cy.get('[aria-label="Toggle favorites"]').click()
    
    // Wait for favorites to load
    cy.wait(1000)
    
    // Find the country in favorites and click trash icon to remove
    cy.get('@countryName').then(countryName => {
      cy.contains(countryName.trim())
        .parent()
        .parent()
        .find('[aria-label*="Remove"]')
        .click()
    })
    
    // Wait for API request to complete
    cy.wait(1000)
    
    // Verify the country is no longer in favorites
    cy.get('@countryName').then(countryName => {
      cy.contains(countryName.trim()).should('not.exist')
    })
  })
  
  it('should persist favorites across page refreshes', () => {
    // Get the first country card
    cy.get('[data-testid=country-card]').first().as('firstCountry')
    
    // Get the country name for verification
    cy.get('@firstCountry').find('[data-testid=country-name]')
      .should('exist')
      .invoke('text')
      .as('countryName')
    
    // Click heart icon if it's not already a favorite
    cy.get('@firstCountry').then($card => {
      if ($card.find('[aria-label*="Add to favorites"]').length > 0) {
        cy.wrap($card).find('[aria-label*="Add to favorites"]').click()
        cy.wait(1000)
      }
    })
    
    // Refresh the page
    cy.reload()
    
    // Wait for countries to load
    cy.get('[data-testid=country-grid]', { timeout: 10000 }).should('be.visible')
    cy.get('[data-testid=country-card]', { timeout: 10000 }).should('have.length.at.least', 1)
    
    // First country should still be favorited
    cy.get('@firstCountry').find('[aria-label*="Remove from favorites"]')
      .should('exist')
      
    // Go to home page
    cy.visit('http://localhost:5173/')
    
    // Open favorites panel
    cy.get('[aria-label="Toggle favorites"]').click()
    
    // Check if the country is still in favorites
    cy.get('@countryName').then(countryName => {
      cy.contains(countryName.trim()).should('be.visible')
    })
  })
})