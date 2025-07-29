import type { Ref } from 'vue'
import { computed, isRef, ref } from 'vue'
import { allShlagemons } from '~/data/shlagemons'
import { useAudioStore } from '~/stores/audio'

export interface SlidingPuzzle {
  tiles: number[]
  emptyIndex: number
  image: string
  size: number
}

export type PuzzleDirection = 'up' | 'down' | 'left' | 'right'

export function useSlidingPuzzle(size: number | Ref<number>) {
  const sizeRef = isRef(size) ? size : ref(size)
  const tiles = ref<number[]>([])
  const emptyIndex = ref(0)
  const image = ref('')
  const solved = ref(false)
  const audio = useAudioStore()
  const shuffling = ref(false)

  function init() {
    tiles.value = Array.from({ length: sizeRef.value * sizeRef.value }, (_, i) => i)
    emptyIndex.value = sizeRef.value * sizeRef.value - 1
    solved.value = true
  }

  function validDirections(): PuzzleDirection[] {
    const r = Math.floor(emptyIndex.value / sizeRef.value)
    const c = emptyIndex.value % sizeRef.value
    const dirs: PuzzleDirection[] = []
    if (r < sizeRef.value - 1)
      dirs.push('up')
    if (r > 0)
      dirs.push('down')
    if (c < sizeRef.value - 1)
      dirs.push('left')
    if (c > 0)
      dirs.push('right')
    return dirs
  }

  async function shuffleBoard(moves = 50, delay = 50) {
    shuffling.value = true
    solved.value = false
    const opposites: Record<PuzzleDirection, PuzzleDirection> = { up: 'down', down: 'up', left: 'right', right: 'left' }
    let lastDir: PuzzleDirection | null = null
    for (let i = 0; i < moves; i++) {
      const dirs = validDirections().filter(d => opposites[d] !== lastDir)
      const dir = dirs[Math.floor(Math.random() * dirs.length)]
      move(dir)
      lastDir = dir
      await new Promise(r => setTimeout(r, delay))
    }
    shuffling.value = false
  }

  function reset() {
    const mon = allShlagemons[Math.floor(Math.random() * allShlagemons.length)]
    image.value = `/shlagemons/${mon.id}/${mon.id}.webp`
    init()
  }

  function swap(idx: number) {
    [tiles.value[idx], tiles.value[emptyIndex.value]]
      = [tiles.value[emptyIndex.value], tiles.value[idx]]
    emptyIndex.value = idx
    solved.value = tiles.value.every((v, i) => v === i)
    audio.playSfx('mini-game-taquin-move')
  }

  function move(dir: PuzzleDirection) {
    const r = Math.floor(emptyIndex.value / sizeRef.value)
    const c = emptyIndex.value % sizeRef.value
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
    if (r2 < 0 || r2 >= sizeRef.value || c2 < 0 || c2 >= sizeRef.value)
      return
    const idx = r2 * sizeRef.value + c2
    swap(idx)
  }

  function moveTile(idx: number) {
    const r = Math.floor(idx / sizeRef.value)
    const c = idx % sizeRef.value
    const r0 = Math.floor(emptyIndex.value / sizeRef.value)
    const c0 = emptyIndex.value % sizeRef.value
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
    size: sizeRef,
    shuffling,
    move,
    moveTile,
    reset,
    shuffleBoard,
  }
}
