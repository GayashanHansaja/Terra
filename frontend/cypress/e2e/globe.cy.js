describe('Globe Visualization', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    
    // Allow time for the globe to initialize and render
    cy.wait(2000)
  })
  
  it('should display the Earth globe on the home page', () => {
    // Check that the globe container is visible
    cy.get('canvas').should('be.visible')
    
    // The globe is rendered on a canvas element by Three.js
    // Verify the canvas has appropriate dimensions (not too small)
    cy.get('canvas')
      .should('have.prop', 'width')
      .and('be.greaterThan', 100)
    
    cy.get('canvas')
      .should('have.prop', 'height')
      .and('be.greaterThan', 100)
    
    // Take a screenshot for visual verification
    cy.screenshot('globe-visible')
    
    // Check that the welcome content is displayed over the globe
    cy.contains('h1', 'Welcome to Terra')
      .should('be.visible')
    
    // Check that interactive elements still work with the globe present
    cy.contains('World Here').should('be.visible')
  })
  
  it('should allow globe interaction', () => {
    // Check that globe interaction elements exist
    cy.get('canvas')
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', 100, 100)
      .trigger('mouseup')
      
    // Wait briefly to see the movement effect
    cy.wait(500)
    
    // Globe should still be visible after interaction
    cy.get('canvas').should('be.visible')
  })
  
  it('should load with proper atmospheric effects', () => {
    // Check for elements that should be visible when globe has loaded properly
    cy.contains('Let\'s Go Around The World!').should('be.visible')
    
    // Ensure the UI elements are positioned correctly relative to the globe
    cy.get('canvas')
      .should('be.visible')
    
    // Check if the search bar is visible on top of the globe
    cy.get('input[type="text"]')
      .should('be.visible')
      
    // Button should be clickable over the globe
    cy.contains('World Here')
      .should('be.visible')
      .click()
      
    // Should navigate to countries page
    cy.url().should('include', '/countries')
  })
  
  it('should display globe with cosmic theme elements', () => {
    // Verify the presence of theme elements that overlay with the globe
    
    // Check for background gradients/effects
    cy.get('div.bg-\\[radial-gradient\\(ellipse_at_center\\,_rgba\\(120\\,0\\,255\\,0\\.15\\)_0\\%\\,rgba\\(0\\,0\\,0\\,0\\.8\\)_70\\%\\)\\]')
      .should('exist')
    
    // Check for cosmic light effects (blur elements)
    cy.get('div.blur-\\[100px\\]')
      .should('exist')
      
    // Verify whole page has appropriate cosmic styling
    cy.get('div.bg-gradient-to-b')
      .should('exist')
      
    // Check that UI elements maintain theme consistency
    cy.get('[aria-label="Toggle favorites"]')
      .should('be.visible')
      .and('have.css', 'border-color')
      .and('not.be.empty')
  })
})