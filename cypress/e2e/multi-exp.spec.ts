describe('multi-exp item', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.clear()
        win.localStorage.setItem('inventory', JSON.stringify({ items: { 'multi-exp': 1 } }))
      },
    })
  })

  it('opens modal on use', () => {
    cy.get('nav .i-carbon-inventory-management').parents('button').click()
    cy.contains('Multi-EXP').parents().contains('Utiliser').click()
    cy.contains('dialog', 'Choisir le porteur du Multi-EXP').should('be.visible')
  })
})
