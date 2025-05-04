// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

import { mount } from 'cypress/react'

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)

import React from 'react'
import CountryCard from '../../src/components/CountryCard'
import { MemoryRouter } from 'react-router-dom'

describe('CountryCard Component', () => {
  const mockCountry = {
    flags: {
      svg: 'https://flagcdn.com/fi.svg'
    },
    name: {
      common: 'Finland'
    },
    capital: ['Helsinki'],
    region: 'Europe',
    population: 5530719,
    cca3: 'FIN'
  }

  beforeEach(() => {
    // Mount the component within a router context since it uses Link
    cy.mount(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    )
  })

  it('renders the country card with correct data', () => {
    // Check the country name is displayed
    cy.get('[data-testid=country-name]').should('contain', 'Finland')
    
    // Check flag image source
    cy.get('img').should('have.attr', 'src', 'https://flagcdn.com/fi.svg')
    
    // Check that the link has the correct destination
    cy.get('[data-testid=country-card]').should('have.attr', 'href', '/country/FIN')
  })

  it('applies hover styles when hovered', () => {
    // Get the country card
    cy.get('[data-testid=country-card]').as('card')
    
    // Store initial styles
    cy.get('@card').then(($card) => {
      const initialTransform = $card.css('transform')
      const initialBoxShadow = $card.css('box-shadow')
      
      // Trigger hover
      cy.get('@card').trigger('mouseover')
      
      // Wait for transition to complete
      cy.wait(350)
      
      // Verify styles have changed
      cy.get('@card').should(($hoveredCard) => {
        const hoveredTransform = $hoveredCard.css('transform')
        const hoveredBoxShadow = $hoveredCard.css('box-shadow')
        
        // In component tests, we can use jQuery assertions
        expect(hoveredTransform).not.to.equal(initialTransform)
        expect(hoveredBoxShadow).not.to.equal(initialBoxShadow)
      })
    })
  })

  it('shows the image with proper styling', () => {
    cy.get('img')
      .should('have.class', 'h-48')
      .should('have.class', 'w-full')
      .should('have.class', 'object-cover')
  })

  it('returns to original style when hover is removed', () => {
    cy.get('[data-testid=country-card]').as('card')
    
    // Get initial styles
    cy.get('@card').invoke('css', 'transform').as('initialTransform')
    
    // Hover over card
    cy.get('@card').trigger('mouseover')
    cy.wait(350) // Wait for transition
    
    // Remove hover
    cy.get('@card').trigger('mouseout')
    cy.wait(350) // Wait for transition back
    
    // Verify card returns to original state
    cy.get('@card').invoke('css', 'transform').then(function(finalTransform) {
      expect(finalTransform).to.equal(this.initialTransform)
    })
  })
})