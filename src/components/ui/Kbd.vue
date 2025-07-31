<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    keyName: string
    size?: Size
    waiting?: boolean
    clickable?: boolean
    ariaLabel?: string
  }>(),
  {
    size: 'md',
    waiting: false,
    clickable: false,
    ariaLabel: undefined,
  },
)
// Types stricts pour la taille (readonly tuple)
const sizes = ['sm', 'md', 'lg', 'xl'] as const
type Size = typeof sizes[number]

// Dictionnaire de labels humanisés pour les touches courantes
const KEY_LABELS = Object.freeze({
  'Control': 'Ctrl',
  'Alt': 'Alt',
  'Shift': 'Maj',
  'Meta': 'Windows',
  'Tab': 'Tab',
  ' ': 'Espace',
  'Enter': 'Entrée',
  'Backspace': 'Retour',
  'Escape': 'Échap',
  'ArrowUp': '↑',
  'ArrowDown': '↓',
  'ArrowLeft': '←',
  'ArrowRight': '→',
} as const)

const label = computed(() => KEY_LABELS[props.keyName as keyof typeof KEY_LABELS] ?? props.keyName)

// UnoCSS responsive size map, mobile-first
const sizeMap: Record<Size, string> = {
  sm: 'text-xs px-1.5 py-0.5 min-w-[1.75em] min-h-[1.5em]',
  md: 'text-sm px-2 py-0.5 min-w-[2em] min-h-[1.8em]',
  lg: 'text-base px-3 py-1 min-w-[2.4em] min-h-[2.2em]',
  xl: 'text-lg px-4 py-1.5 min-w-[2.7em] min-h-[2.5em]',
} as const

// Classes UnoCSS (éviter le SCSS @apply pour la purge)
const baseClass
  = 'inline-flex items-center justify-center rounded select-none border border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-inner-sm transition-all duration-75 font-mono font-semibold outline-none'

const clickableClass
  = 'cursor-pointer active:scale-95 hover:bg-gray-200 dark:hover:bg-gray-600 focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-600'

// Animation attente
const waitingClass
  = 'animate-pulse opacity-70 pointer-events-none'

// Focus ring pour accessibilité
const focusClass
  = 'focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-600'

// Keyboard accessibility: gestion du click clavier
function onKeydown(e: KeyboardEvent) {
  if (!props.clickable)
    return
  if (e.key === 'Enter' || e.key === ' ') {
    (e.target as HTMLElement).click()
    e.preventDefault()
  }
}
</script>

<template>
  <kbd
    :tabindex="props.clickable ? 0 : undefined"
    role="button"
    :aria-label="props.ariaLabel ?? label"
    :aria-disabled="props.waiting ? 'true' : undefined"
    :class="[
      baseClass,
      sizeMap[props.size],
      props.clickable ? clickableClass : '',
      props.waiting ? waitingClass : '',
      focusClass,
    ]"
    :disabled="props.waiting"
    @keydown="onKeydown"
  >
    <span class="pointer-events-none">{{ label }}</span>
    <!-- Petit spinner animé si waiting -->
    <span
      v-if="props.waiting"
      class="ml-1 inline-block h-3 w-3 animate-spin border-2 border-gray-400 border-t-transparent rounded-full align-middle dark:border-gray-400"
      aria-hidden="true"
    />
  </kbd>
</template>
