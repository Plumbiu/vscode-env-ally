import { expect, test } from 'vitest'
import { rules } from '../constant'

test('js/ts', () => {
  const js = rules['javascript']
  const ts = rules['typescript']
  expect(js.test('console.log(import.meta.env.foo)')).toBe(true)
  expect(js.test('console.log(import?.meta?.env?.foo)')).toBe(true)
  expect(ts.test('console.log(import.meta.env.foo)')).toBe(true)
  expect(ts.test('console.log(import?.meta?.env?.foo)')).toBe(true)
})

test('python', () => {
  const py = rules['python']
  expect(py.test('print(os.getenv("foo"))')).toBe(true)
})

test('go', () => {
  const go = rules['go']
  expect(go.test('fmt.Println(os.Getenv("foo"))')).toBe(true)
})

test('php', () => {
  const php = rules['php']
  expect(php.test('hello {$_SERVER[\'HELLO\']}')).toBe(true)
})

test('rust', () => {
  const rust = rules['rust']
  expect(rust.test('let xxx = std::env::var("HELLO")')).toBe(true)
})
