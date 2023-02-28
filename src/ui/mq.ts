const gap = 1

export function up(value: number) {
  return `(min-width: ${value}px)`
}

export function down(value: number) {
  return `(max-width: ${value - gap}px)`
}

export function between(min: number, max: number) {
  return `${up(min)} and ${down(max)}`
}
