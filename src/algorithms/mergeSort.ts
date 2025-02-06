import { pause } from '../utils/pause'
import type { AlgorithmFunction } from './types'

const merge = async (
  array: number[],
  start: number,
  mid: number,
  end: number,
  updateUI: (
    array: number[],
    options?: {
      activeIndex?: number
      compareIndex?: number
      sortedIndices?: number[]
    },
  ) => void,
  history: any,
  player: any,
): Promise<void> => {
  const leftArray = array.slice(start, mid + 1)
  const rightArray = array.slice(mid + 1, end + 1)

  let i = 0,
    j = 0,
    k = start

  while (i < leftArray.length && j < rightArray.length) {
    await pause({ history, player })

    updateUI(array, { activeIndex: start + i, compareIndex: mid + 1 + j })

    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i]
      i++
    } else {
      array[k] = rightArray[j]
      j++
    }
    k++
    updateUI(array)
  }

  while (i < leftArray.length) {
    array[k] = leftArray[i]
    i++
    k++
    updateUI(array)
  }

  while (j < rightArray.length) {
    array[k] = rightArray[j]
    j++
    k++
    updateUI(array)
  }
}

const mergeSortRecursive = async (
  array: number[],
  start: number,
  end: number,
  updateUI: (
    array: number[],
    options?: {
      activeIndex?: number
      compareIndex?: number
      sortedIndices?: number[]
    },
  ) => void,
  history: any,
  player: any,
): Promise<void> => {
  if (start >= end) {
    return
  }

  const mid = Math.floor((start + end) / 2)

  await mergeSortRecursive(array, start, mid, updateUI, history, player)
  await mergeSortRecursive(array, mid + 1, end, updateUI, history, player)

  await merge(array, start, mid, end, updateUI, history, player)

  updateUI(array, {
    sortedIndices: Array.from(
      { length: end - start + 1 },
      (_, idx) => start + idx,
    ),
  })
}

export const mergeSort: AlgorithmFunction = async ({
  array,
  updateUI,
  history,
  player,
}) => {
  await mergeSortRecursive(
    array,
    0,
    array.length - 1,
    updateUI,
    history,
    player,
  )
  updateUI(array, { sortedIndices: array.map((_, idx) => idx) })

  return array
}
