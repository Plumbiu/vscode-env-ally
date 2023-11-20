import path from 'node:path'
import { rules } from '../constant'

export function isEnvFile(file: string) {
  return path.basename(file).startsWith('.env')
}
export function findProp(str: string, lang: string) {
  const result = rules[lang]?.exec(str)
  if (!result) {
    return undefined
  }
  return result[result.length - 1]
}
