import { between, down, up } from './mq'

describe('ui/mq', () => {
  test('up', () => {
    expect(up(0)).toBe(`(min-width: 0px)`)
  })

  test('down', () => {
    expect(down(1024)).toBe(`(max-width: 1023px)`)
  })

  test('between', () => {
    expect(between(1024, 1280)).toBe(`(min-width: 1024px) and (max-width: 1279px)`)
  })
})
