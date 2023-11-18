import { expect, test, describe } from 'vitest'
import { findProp, isEnvFile } from '../utils'

describe('findProp', () => {
  test('js/ts', () => {
    expect(findProp('import.meta.env.foo', 'javascript')).toBe('foo')
    expect(findProp('import.meta.env.foo', 'typescript')).toBe('foo')
    expect(findProp('process.env.foo', 'javascript')).toBe('foo')
    expect(findProp('process.env.foo', 'typescript')).toBe('foo')

    expect(findProp('import?.meta?.env?.foo', 'javascript')).toBe('foo')
    expect(findProp('import?.meta?.env?.foo', 'typescript')).toBe('foo')
    expect(findProp('process?.env?.foo', 'javascript')).toBe('foo')
    expect(findProp('process?.env?.foo', 'typescript')).toBe('foo')
  })

  test('python', () => {
    expect(findProp('os.getenv("foo")', 'python')).toBe('foo')
    expect(findProp('os.getenv(\'foo\')', 'python')).toBe('foo')
  })

  test('go', () => {
    expect(findProp('os.Getenv("HELLO")', 'go')).toBe('HELLO')
  })

  test('php', () => {
    expect(findProp('{$_SERVER[\'HELLO\']}', 'php')).toBe('HELLO')
  })

  test('rust', () => {
    expect(findProp('std::env::var("HELLO")', 'rust')).toBe('HELLO')
  })
})

test('isEnvFile', () => {
  const p1 = 'd:\\a\\b\\.env'
  const p2 = 'd:\\a\\b\\.env.local'
  const p3 = 'd:\\a\\b\\env.local'
  expect(isEnvFile(p1)).toBe(true)
  expect(isEnvFile(p2)).toBe(true)
  expect(isEnvFile(p3)).toBe(false)
})
