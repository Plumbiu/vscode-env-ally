import { expect, test } from 'vitest'
import { lastProp } from '../utils'

test('lastProp', () => {
  expect(lastProp('import.env.foo')).toBe('foo')
  expect(lastProp('import.env')).toBe('env')
})

test('isEnvFile', () => {
  expect(lastProp('d:\\@plumbiu\\scripts\\events.js')).toBe(false)
  expect(lastProp('d:\\@plumbiu\\scripts\\env.js')).toBe(false)
  expect(lastProp('d:\\@plumbiu\\scripts\\.env.local')).toBe(true)
})
