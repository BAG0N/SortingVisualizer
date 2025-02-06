export const generateRandomArray = (length: number): number[] => {
  const min = 23
  const max = 100

  const range = Array.from({ length: max - min + 1 }, (_, i) => min + i)
  const slicedRange = range.slice(0, length)
  for (let i = slicedRange.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[slicedRange[i], slicedRange[j]] = [slicedRange[j], slicedRange[i]]
  }

  return slicedRange
}
