/**
 * Composable managing shop category tabs.
 *
 * It exposes the available categories, the active tab index and
 * a list of tab descriptors used by UiTabs.
 */
import type { Item, ItemCategory } from '~/type/item'
import ShopItemCard from '~/components/shop/ItemCard.vue'
import UiButton from '~/components/ui/Button.vue'

export function useShopTabs(selectItem: (item: Item) => void) {
  const zone = useZoneStore()
  const filter = useShopFilterStore()
  const { t } = useI18n()

  const shopItems = computed(() => {
    if (zone.current.type !== 'village')
      return []
    return zone.current.pois.shop?.items || []
  })

  const categoryOptions = [
    { label: t('components.panel.Shop.category.battle'), value: 'battle', icon: 'i-carbon:crossroads' },
    { label: t('components.panel.Shop.category.active'), value: 'actif', icon: 'i-carbon-flash' },
    { label: t('components.panel.Shop.category.passive'), value: 'passif', icon: 'i-carbon-timer' },
    { label: t('components.panel.Shop.category.utility'), value: 'utilitaire', icon: 'i-carbon-tool-box' },
    { label: t('components.panel.Shop.category.activable'), value: 'activable', icon: 'i-carbon-fire' },
  ] as const

  const availableCategories = computed(() =>
    categoryOptions
      .filter(opt => shopItems.value.some(i => i.category === opt.value))
      .map(opt => ({
        label: { text: opt.label, icon: opt.icon },
        value: opt.value,
      })),
  )

  const activeTab = ref(0)
  const categories = computed(() => availableCategories.value)

  watch(() => filter.category, (val) => {
    const idx = categories.value.findIndex(c => c.value === val)
    if (idx !== -1 && idx !== activeTab.value)
      activeTab.value = idx
  }, { immediate: true })

  watch(activeTab, (val) => {
    const cat = categories.value[val]?.value
    if (cat && cat !== filter.category)
      filter.category = cat
  })

  watch(availableCategories, (cats) => {
    if (!cats.length)
      filter.category = 'all'
    else if (!cats.some(c => c.value === filter.category))
      filter.category = cats[0].value
  }, { immediate: true })

  function getList(category: ItemCategory | 'all') {
    return computed(() => {
      let list = shopItems.value.slice()
      if (category !== 'all')
        list = list.filter(item => item.category === category)
      return list.sort((a, b) => {
        const typeComp = (a.type || '').localeCompare(b.type || '')
        if (typeComp !== 0)
          return typeComp
        return (a.power || 0) - (b.power || 0)
      })
    })
  }

  const tabs = computed(() =>
    categories.value.map(cat => ({
      label: cat.label,
      component: defineComponent({
        name: `ShopTab_${cat.value}`,
        setup() {
          const list = getList(cat.value)
          return () => h(
            'div',
            {
              class:
                'tiny-scrollbar grid xl:grid-cols-2 3xl:grid-cols-3 gap-2 overflow-y-auto overflow-x-hidden p-1 auto-rows-min',
            },
            list.value.map(item => h(
              ShopItemCard,
              {
                item,
                class: 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800',
                onClick: () => selectItem(item),
              },
              {
                default: () => h(
                  UiButton,
                  {
                    class: 'ml-auto text-xs',
                    onClick: (e: Event) => {
                      e.stopPropagation()
                      selectItem(item)
                    },
                  },
                  () => t('components.panel.Shop.details'),
                ),
              },
            )),
          )
        },
      }),
    })),
  )

  const filteredShopItems = getList('all')

  return { activeTab, availableCategories, tabs, filteredShopItems }
}
