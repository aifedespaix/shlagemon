import { multiExp } from '../../src/data/items/items'

describe('multi-exp item', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.clear()
        win.localStorage.setItem('inventory', JSON.stringify({ items: { [multiExp.id]: 1 } }))
      },
    })
  })

  it('opens modal on use', () => {
    cy.get('nav .i-carbon-inventory-management').parents('button').click()
    cy.contains('Multi-EXP').parents().contains('Utiliser').click()
    cy.contains('dialog', 'Choisir le porteur de Multi-EXP').should('be.visible')
  })
})
