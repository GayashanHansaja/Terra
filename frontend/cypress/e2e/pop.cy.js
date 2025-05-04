describe('Country Card Hover Effects', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    
    // Wait for countries to load
    cy.get('[data-testid=country-grid]', { timeout: 50000 }).should('be.visible')
  })

  it('should pop up/scale when hovered', () => {
    // Get the first country card
    cy.get('[data-testid=country-card]').first().as('countryCard')
    
    // Get the initial transform state
    cy.get('@countryCard')
      .invoke('css', 'transform')
      .then((initialTransform) => {
        // Hover over the card
        cy.get('@countryCard').trigger('mouseover')
        
        // Wait for transition to complete (300ms as per CSS)
        cy.wait(350)
        
        // Verify the card has scaled up
        cy.get('@countryCard')
          .invoke('css', 'transform')
          .should((hoveredTransform) => {
            // When hovered, the transform should change (not equal to initial state)
            expect(hoveredTransform).not.to.equal(initialTransform)
            
            // If initial was "none" or matrix(1, 0, 0, 1, 0, 0), hovered should include scaling
            if (initialTransform === 'none' || initialTransform === 'matrix(1, 0, 0, 1, 0, 0)') {
              expect(hoveredTransform).to.include('matrix(1.02')
            }
          })
        
        // Also verify shadow appears on hover
        cy.get('@countryCard')
          .should('have.css', 'box-shadow')
          .and('not.equal', 'none')
      })
  })
  
  it('should return to original state when hover is removed', () => {
    // Get the first country card
    cy.get('[data-testid=country-card]').first().as('countryCard')
    
    // Store initial transform state
    cy.get('@countryCard')
      .invoke('css', 'transform')
      .as('initialTransform')
    
    // Hover over the card
    cy.get('@countryCard').trigger('mouseover')
    
    // Wait for transition
    cy.wait(350)
    
    // Remove hover
    cy.get('@countryCard').trigger('mouseout')
    
    // Wait for transition back
    cy.wait(350)
    
    // Verify card returns to original state
    cy.get('@countryCard')
      .invoke('css', 'transform')
      .then(function(finalTransform) {
        expect(finalTransform).to.equal(this.initialTransform)
      })
  })
})