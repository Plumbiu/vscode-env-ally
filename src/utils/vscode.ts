import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { glob } from 'fast-glob'
import {
  FileSystemWatcher,
  workspace,
  RelativePattern,
  MarkdownString,
} from 'vscode'
import { parse as envParse } from 'dotenv'
import { ignorePattern } from '../constant'
import { RawEnv, Env, EnvValue } from '../types'

export function resolveEnv(rawEnv: RawEnv) {
  const env: Env = {}
  for (const [envPath, data] of Object.entries(rawEnv)) {
    for (const [envName, envVal] of Object.entries(data)) {
      if (!env[envName]) {
        env[envName] = []
      }
      env[envName].push({
        path: envPath,
        name: path.basename(envPath),
        value: envVal,
      })
    }
  }
  return env
}

export async function initEnv(cwd: string) {
  const rawEnv: RawEnv = {}
  const wather: FileSystemWatcher[] = []
  // TODO: fast-glob or workspace.findFiles?
  const globPaths = await glob('**/.env*', {
    ignore: ignorePattern,
    cwd,
    absolute: true,
  })
  for (const envPath of globPaths) {
    wather.push(
      workspace.createFileSystemWatcher(
        new RelativePattern(path.dirname(envPath), '.env*'),
        false,
        true,
        false,
      ),
    )
    rawEnv[path.normalize(envPath)] = await readEnv(envPath)
  }

  return {
    rawEnv,
    wather,
  }
}

export async function readEnv(envPath: string) {
  const envBuf = await fs.readFile(envPath)
  return envParse(envBuf)
}

export function genEnvMarkdown(envValues: EnvValue[], title?: string) {
  const md = new MarkdownString(title)
  for (const { path, name, value } of envValues) {
    md.appendMarkdown(`

[${name}](${pathToFileURL(path)}) \`${value}\`
`)
  }

  return md
}
