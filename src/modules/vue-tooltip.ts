import type { UserModule } from '~/types'
import FloatingVue from 'floating-vue'
import { observeTooltipAccessibility } from '~/utils/tooltipAccessibility'

export const install: UserModule = ({ app, isClient }) => {
  // FloatingVue depends on browser APIs. During SSR we still need the
  // `v-tooltip` directive to be registered so the renderer can resolve it
  // without throwing. Register a no-op directive when `isClient` is false
  // and let the real plugin take over on the client.
  if (!isClient) {
    app.directive('tooltip', {
      /**
       * Vue's server renderer expects directives to expose `getSSRProps`.
       * Returning an empty object avoids runtime errors while rendering the
       * static markup.
       */
      getSSRProps: () => ({}),
    })
    return
  }

  app.use(FloatingVue, {
    // Disable popper components
    disabled: false,
    // Default position offset along main axis (px)
    distance: 5,
    // Default position offset along cross axis (px)
    skidding: 0,
    // Default container where the tooltip will be appended
    container: 'body',
    // Element used to compute position and size boundaries
    boundary: undefined,
    // Skip delay & CSS transitions when another popper is shown, so that the popper appear to instanly move to the new position.
    instantMove: false,
    // Auto destroy tooltip DOM nodes (ms)
    disposeTimeout: 5000,
    // Triggers on the popper itself
    popperTriggers: [],
    // Positioning strategy
    strategy: 'absolute',
    // Prevent overflow
    preventOverflow: true,
    // Flip to the opposite placement if needed
    flip: true,
    // Shift on the cross axis to prevent the popper from overflowing
    shift: true,
    // Overflow padding (px)
    overflowPadding: 0,
    // Arrow padding (px)
    arrowPadding: 0,
    // Compute arrow overflow (useful to hide it)
    arrowOverflow: true,
    /**
     * By default, compute autohide on 'click'.
     */
    autoHideOnMousedown: false,
    // Themes
    themes: {
      tooltip: {
      // Default tooltip placement relative to target element
        placement: 'top',
        // Default events that trigger the tooltip
        triggers: ['hover', 'focus', 'touch'],
        // Close tooltip on click on tooltip target
        hideTriggers: events => [...events, 'click'],
        // Delay (ms)
        delay: {
          show: 200,
          hide: 0,
        },
        // Update popper on content resize
        handleResize: false,
        // Enable HTML content in directive
        html: false,
        // Displayed when tooltip content is loading
        loadingContent: '...',
      },
      dropdown: {
      // Default dropdown placement relative to target element
        placement: 'bottom',
        // Default events that trigger the dropdown
        triggers: ['click'],
        // Delay (ms)
        delay: 0,
        // Update popper on content resize
        handleResize: true,
        // Hide on click outside
        autoHide: true,
      },
      menu: {
        $extend: 'dropdown',
        triggers: ['hover', 'focus'],
        popperTriggers: ['hover', 'focus'],
        delay: {
          show: 0,
          hide: 400,
        },
      },
    },
  })

  const accessibility = useAccessibilityStore()
  const ui = useUIStore()

  function updateOptions() {
    FloatingVue.options.autoHideOnMousedown = !accessibility.autoHideTooltips
    FloatingVue.options.themes.tooltip.autoHide = accessibility.autoHideTooltips
    FloatingVue.options.themes.tooltip.hideTriggers = accessibility.autoHideTooltips
      ? (events: string[]) => [...events, 'click']
      : () => []
    FloatingVue.options.themes.tooltip.delay = {
      show: 200,
      hide: ui.isMobile && accessibility.autoHideTooltips ? 2250 : 0,
    }
  }

  updateOptions()
  watch(
    () => [accessibility.autoHideTooltips, ui.isMobile],
    updateOptions,
  )
  // Ensure tooltip poppers remain accessible when their visibility changes.
  observeTooltipAccessibility()
}
