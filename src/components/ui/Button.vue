<script setup lang="ts">
// --- Types stricts pour Button
export type ButtonType
  = | 'primary'
    | 'valid'
    | 'danger'
    | 'default'
    | 'ghost'
    | 'icon'
    | 'menu'

export type ButtonVariant = 'solid' | 'outline'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    type?: ButtonType
    variant?: ButtonVariant
    size?: ButtonSize
    disabled?: boolean
    ariaLabel?: string
    iconSize?: string // Ajout d’une prop taille icône : ex "text-xl" ou "text-2xl"
    circle?: boolean
  }>(),
  {
    type: 'default',
    variant: 'solid',
    size: 'md',
    disabled: false,
    ariaLabel: undefined,
    iconSize: '', // vide = auto
    circle: false,
  },
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs': return 'text-xs px-2 py-1 min-h-[1.75rem] min-w-[1.75rem]'
    case 'sm': return 'text-sm px-3 py-1.5 min-h-[2rem] min-w-[2rem]'
    case 'lg': return 'text-lg px-5 py-3 min-h-[3rem] min-w-[3rem]'
    default: return 'text-base px-4 py-2 min-h-[2.5rem] min-w-[2.5rem]'
  }
})

// --- Styles UnoCSS fixés à la racine (jamais dynamiques dans le template)
const baseClass
  = 'inline-flex items-center justify-center font-semibold outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 transition-all duration-150 ease-out shadow-sm active:translate-y-[1px] active:scale-[0.98] hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none select-none'

const radiusClass = computed(() =>
  props.circle || props.type === 'icon'
    ? 'rounded-full aspect-square'
    : 'rounded-xl',
)

const typeVariantClass = computed(() => {
  if (props.type === 'icon') {
    return `${sizeClass.value}
      bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200
      hover:bg-gray-200 dark:hover:bg-gray-700
      focus-visible:ring-2 focus-visible:ring-cyan-400`
  }
  if (props.type === 'menu') {
    return `flex-1 ${sizeClass.value}
      bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200
      hover:bg-gray-100 dark:hover:bg-gray-800`
  }
  const map: Record<
    Exclude<ButtonType, 'icon' | 'menu'>,
    Record<ButtonVariant, string>
  > = {
    primary: {
      solid:
        'bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800',
      outline:
        'border border-blue-600 dark:border-blue-700 text-blue-700 dark:text-blue-300 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-800/30',
    },
    valid: {
      solid:
        'bg-green-600 dark:bg-green-700 text-white hover:bg-green-700 dark:hover:bg-green-800',
      outline:
        'border border-green-600 dark:border-green-700 text-green-700 dark:text-green-300 bg-transparent hover:bg-green-50 dark:hover:bg-green-800/30',
    },
    danger: {
      solid:
        'bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800',
      outline:
        'border border-red-600 dark:border-red-700 text-red-700 dark:text-red-300 bg-transparent hover:bg-red-50 dark:hover:bg-red-800/30',
    },
    default: {
      solid:
        'bg-cyan-600 dark:bg-cyan-700 text-white hover:bg-cyan-700 dark:hover:bg-cyan-800',
      outline:
        'border border-cyan-600 dark:border-cyan-700 text-cyan-700 dark:text-cyan-200 bg-transparent hover:bg-cyan-50 dark:hover:bg-cyan-800/30',
    },
    ghost: {
      solid:
        'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
      outline:
        'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700/40',
    },
  }
  return `${sizeClass.value} ${map[props.type][props.variant]}`
})

// Gestion click (émission + focus visuel natif)
function handleClick(e: MouseEvent) {
  if (!props.disabled)
    emit('click', e)
}
</script>

<template>
  <button
    :type="props.type === 'icon' ? 'button' : 'submit'"
    :disabled="props.disabled"
    :aria-label="props.ariaLabel"
    :tabindex="props.disabled ? -1 : 0"
    :class="[baseClass, radiusClass, typeVariantClass]"
    @click="handleClick"
  >
    <span
      v-if="props.type === 'icon'"
      class="h-full w-full flex items-center justify-center" :class="[
        props.iconSize || {
          xs: 'text-base',
          sm: 'text-xl',
          md: 'text-2xl',
          lg: 'text-3xl',
        }[props.size],
      ]"
      aria-hidden="true"
    >
      <slot />
    </span>
    <template v-else>
      <slot />
    </template>
  </button>
</template>
