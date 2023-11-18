import path from 'node:path'
import { rules } from '../constant'

export function isEnvFile(file: string) {
  return path.basename(file).startsWith('.env')
}
export function findProp(str: string, lang: string) {
  const [_, p1, p2] = rules[lang]?.exec(str) ?? []
  return p1 ?? p2 ?? ''
}
