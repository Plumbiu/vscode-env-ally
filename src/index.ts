import {
  type ExtensionContext,
  languages,
  Hover,
  workspace,
  window,
} from 'vscode'
import type { Env } from './types'
import { resolveEnv, genEnvMarkdown, isEnvFile, lastProp } from './utils'

export function activate(ctx: ExtensionContext) {
  let env: Env = {}
  let fromEnv = false
  resolveEnv(env)
  window.onDidChangeActiveTextEditor((e) => {
    const fileName = e?.document.fileName
    if (!fileName) {
      return
    }
    if (isEnvFile(fileName)) {
      fromEnv = true
    } else if (fromEnv) {
      env = {}
      resolveEnv(env)
      fromEnv = false
    }
  })
  // TODO: reduce the code
  workspace.onDidSaveTextDocument((e) => {
    if (isEnvFile(e.fileName)) {
      // FIXME: it works, but weird
      env = {}
      resolveEnv(env)
    }
  })
  workspace.onDidRenameFiles((e) => {
    const files = e.files.filter(({ newUri }) => isEnvFile(newUri.fsPath))
    if (!files.length) {
      return
    }
    env = {}
    resolveEnv(env)
  })
  workspace.onDidCreateFiles((e) => {
    const files = e.files.filter(({ fsPath }) => isEnvFile(fsPath))
    if (!files.length) {
      return
    }
    env = {}
    resolveEnv(env)
  })
  workspace.onDidDeleteFiles((e) => {
    const files = e.files.filter(({ fsPath }) => isEnvFile(fsPath))
    if (!files.length) {
      return
    }
    env = {}
    resolveEnv(env)
  })
  // TODO: More language support
  languages.registerHoverProvider(['javascript', 'typescrript'], {
    provideHover(document, position) {
      const range = document.getWordRangeAtPosition(
        position,
        /process.env.*|import.meta.env.*/,
      )
      const prop = lastProp(document.getText(range))
      const hoverContent = genEnvMarkdown(env[prop], prop)
      return new Hover(hoverContent)
    },
  })
}

export function deactivate() {}
