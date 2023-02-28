export function numberAndDot(s: string) {
  const rgx = /^[0-9]*\.?[0-9]*$/

  return s?.toString().match(rgx)
}
