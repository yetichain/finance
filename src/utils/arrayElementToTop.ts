export const arrayElementToTop = (condition, arr) => {
  try {
    const idx = arr.findIndex((o) => condition(o))
    if (idx === -1) return arr
    return [arr[idx], ...arr.slice(0, idx), ...arr.slice(idx + 1)]
  } catch (error) {
    return arr
  }
}
