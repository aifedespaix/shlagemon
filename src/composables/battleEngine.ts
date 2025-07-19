export function useSingleInterval(handler: () => void, delay = 1000) {
  const { pause, resume } = useIntervalFn(handler, delay, { immediate: false })
  onUnmounted(pause)
  return {
    start: resume,
    clear: pause,
  }
}

export function useBattleEffects() {
  const playerEffect = ref('')
  const enemyEffect = ref('')
  const playerVariant = ref<'normal' | 'high' | 'low'>('normal')
  const enemyVariant = ref<'normal' | 'high' | 'low'>('normal')

  function showEffect(
    target: 'player' | 'enemy',
    effect: 'super' | 'not' | 'normal',
    crit: 'critical' | 'weak' | 'normal',
  ) {
    if (effect === 'normal' && crit === 'normal')
      return
    const messages: string[] = []
    if (crit === 'critical')
      messages.push('Coup critique !')
    else if (crit === 'weak')
      messages.push('Coup mou...')
    if (effect === 'super')
      messages.push('C\u2019est super efficace !')
    else if (effect === 'not')
      messages.push('Pas tr\u00E8s efficace...')
    const text = messages.join(' ')
    const variant
      = effect === 'super' || crit === 'critical'
        ? 'high'
        : effect === 'not' || crit === 'weak'
          ? 'low'
          : 'normal'
    if (target === 'enemy') {
      enemyEffect.value = text
      enemyVariant.value = variant
      useTimeoutFn(() => {
        enemyEffect.value = ''
        enemyVariant.value = 'normal'
      }, 500)
    }
    else {
      playerEffect.value = text
      playerVariant.value = variant
      useTimeoutFn(() => {
        playerEffect.value = ''
        playerVariant.value = 'normal'
      }, 500)
    }
  }

  return {
    playerEffect,
    enemyEffect,
    playerVariant,
    enemyVariant,
    showEffect,
  }
}
