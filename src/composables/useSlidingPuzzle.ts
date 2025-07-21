import { computed, ref } from 'vue'
import { allShlagemons } from '~/data/shlagemons'
import { useAudioStore } from '~/stores/audio'

export interface SlidingPuzzle {
  tiles: number[]
  emptyIndex: number
  image: string
  size: number
}

function shuffle(arr: number[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

function inversions(arr: number[]) {
  let inv = 0
  const a = arr.filter(n => n >= 0)
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (a[i] > a[j])
        inv++
    }
  }
  return inv
}

function isSolvable(tiles: number[], size: number, emptyIndex: number) {
  const inv = inversions(tiles)
  if (size % 2)
    return inv % 2 === 0
  const rowFromBottom = size - Math.floor(emptyIndex / size)
  return (inv + rowFromBottom) % 2 === 0
}

export function useSlidingPuzzle(size: number) {
  const tiles = ref<number[]>([])
  const emptyIndex = ref(0)
  const image = ref('')
  const solved = ref(false)
  const audio = useAudioStore()

  function reset() {
    const mon = allShlagemons[Math.floor(Math.random() * allShlagemons.length)]
    image.value = `/shlagemons/${mon.id}/${mon.id}.png`
    tiles.value = Array.from({ length: size * size }, (_, i) => i)
    emptyIndex.value = size * size - 1
    do {
      shuffle(tiles.value)
    } while (!isSolvable(tiles.value, size, tiles.value.indexOf(size * size - 1)))
    emptyIndex.value = tiles.value.indexOf(size * size - 1)
    solved.value = false
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

  return { tiles, board, emptyIndex, image, solved, move, moveTile, reset }
}
