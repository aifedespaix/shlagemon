import { computed, ref } from 'vue'
import { allShlagemons } from '~/data/shlagemons'
import { useAudioStore } from '~/stores/audio'

export interface SlidingPuzzle {
  tiles: number[]
  emptyIndex: number
  image: string
  size: number
}

export function useSlidingPuzzle(size: number) {
  const tiles = ref<number[]>([])
  const emptyIndex = ref(0)
  const image = ref('')
  const solved = ref(false)
  const audio = useAudioStore()
  const shuffling = ref(false)

  function init() {
    tiles.value = Array.from({ length: size * size }, (_, i) => i)
    emptyIndex.value = size * size - 1
    solved.value = true
  }

  async function shuffleBoard(moves = 50, delay = 50) {
    shuffling.value = true
    solved.value = false
    const dirs = ['up', 'down', 'left', 'right'] as const
    for (let i = 0; i < moves; i++) {
      const dir = dirs[Math.floor(Math.random() * dirs.length)]
      move(dir)
      await new Promise(r => setTimeout(r, delay))
    }
    shuffling.value = false
  }

  function reset() {
    const mon = allShlagemons[Math.floor(Math.random() * allShlagemons.length)]
    image.value = `/shlagemons/${mon.id}/${mon.id}.png`
    init()
  }

  function swap(idx: number) {
    [tiles.value[idx], tiles.value[emptyIndex.value]]
      = [tiles.value[emptyIndex.value], tiles.value[idx]]
    emptyIndex.value = idx
    solved.value = tiles.value.every((v, i) => v === i)
    audio.playSfx('/audio/sfx/mini-game/taquin/move.ogg')
  }

  function move(dir: 'up' | 'down' | 'left' | 'right') {
    const r = Math.floor(emptyIndex.value / size)
    const c = emptyIndex.value % size
    let r2 = r
    let c2 = c
    if (dir === 'up')
      r2++
    else if (dir === 'down')
      r2--
    else if (dir === 'left')
      c2++
    else if (dir === 'right')
      c2--
    if (r2 < 0 || r2 >= size || c2 < 0 || c2 >= size)
      return
    const idx = r2 * size + c2
    swap(idx)
  }

  function moveTile(idx: number) {
    const r = Math.floor(idx / size)
    const c = idx % size
    const r0 = Math.floor(emptyIndex.value / size)
    const c0 = emptyIndex.value % size
    if (Math.abs(r - r0) + Math.abs(c - c0) === 1)
      swap(idx)
  }

  const board = computed(() => tiles.value.map((t, i) => ({ id: t, index: i })))

  reset()

  return {
    tiles,
    board,
    emptyIndex,
    image,
    solved,
    shuffling,
    move,
    moveTile,
    reset,
    shuffleBoard,
  }
}
