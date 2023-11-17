import path from 'node:path'
import fs from 'node:fs'
import { pathToFileURL } from 'node:url'
import { MarkdownString, workspace } from 'vscode'
import { parse as envParse } from 'dotenv'
import { Env, EnvValue } from './types'
import { EnvReg } from './constant'

export function updateEnv(env: Env) {
  // TODO: fast-glob is better?
  workspace.findFiles('**/.env*', '**/node_modules/**').then((filesPath) => {
    for (const fsPath of filesPath.map(({ fsPath }) => fsPath)) {
      fs.readFile(fsPath, (_err, envBuf) => {
        for (const [key, value] of Object.entries(envParse(envBuf))) {
          if (!env[key]) {
            env[key] = []
          }
          env[key].push({
            path: fsPath,
            name: path.basename(fsPath),
            value,
          })
        }
      })
    }
  })
}

export function lastProp(str: string) {
  const [_, s] = EnvReg.exec(str) ?? ['', '']
  return s
}

export function genEnvMarkdown(envValues: EnvValue[], title: string) {
  const md = new MarkdownString(title)
  for (const { path, name, value } of envValues) {
    md.appendMarkdown(`

[${name}](${pathToFileURL(path)}) \`${value}\`
`)
  }

  return md.value
}

export function isEnvFile(file: string) {
  return path.basename(file).startsWith('.env')
}
