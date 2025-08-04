/**
 * Observes tooltip popper elements created by FloatingVue and ensures they
 * remain accessible. The observer enforces two rules:
 *
 * 1. Tooltip poppers are removed from the tab order by setting
 *    `tabindex="-1"`.
 * 2. When a popper is hidden (`aria-hidden="true"`), the `inert` attribute
 *    is applied to prevent it from receiving focus.
 *
 * The observation starts immediately and returns the `MutationObserver` so it
 * can be disconnected if needed (mainly for tests).
 *
 * @param root - Document or root element to observe. Defaults to the current
 * document.
 */
export function observeTooltipAccessibility(
  root: Document | HTMLElement = document,
): MutationObserver {
  const container = root instanceof Document ? root.body : root

  /**
   * Applies `tabindex` and `inert` attributes based on the current
   * `aria-hidden` state of the popper.
   */
  function applyAttributes(popper: HTMLElement) {
    popper.setAttribute('tabindex', '-1')
    if (popper.getAttribute('aria-hidden') === 'true')
      popper.setAttribute('inert', '')
    else
      popper.removeAttribute('inert')
  }

  /**
   * Observe a single popper for attribute changes so the accessibility
   * attributes stay in sync with `aria-hidden`.
   */
  function watchPopper(popper: HTMLElement) {
    applyAttributes(popper)
    new MutationObserver(() => applyAttributes(popper)).observe(popper, {
      attributes: true,
      attributeFilter: ['aria-hidden', 'tabindex'],
    })
  }

  // Apply to any existing poppers
  container.querySelectorAll<HTMLElement>('.v-popper__popper').forEach(watchPopper)

  // Watch for new poppers being added to the DOM
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement && node.classList.contains('v-popper__popper'))
          watchPopper(node)
      }
    }
  })

  observer.observe(container, { childList: true, subtree: true })

  return observer
}
