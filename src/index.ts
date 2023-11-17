import {
  type ExtensionContext,
  languages,
  Hover,
  workspace,
  window,
} from 'vscode'
import type { Env } from './types'
import { updateEnv, genEnvMarkdown, isEnvFile, lastProp } from './utils'

export function activate(ctx: ExtensionContext) {
  let env: Env = {}
  let fromEnv = false
  updateEnv(env)
  window.onDidChangeActiveTextEditor((e) => {
    const fileName = e?.document.fileName
    if (!fileName) {
      return
    }
    if (isEnvFile(fileName)) {
      fromEnv = true
    } else if (fromEnv) {
      env = {}
      updateEnv(env)
      fromEnv = false
    }
  })
  // TODO: reduce the code
  workspace.onDidSaveTextDocument((e) => {
    if (isEnvFile(e.fileName)) {
      // FIXME: it works, but weird
      env = {}
      updateEnv(env)
    }
  })
  workspace.onDidRenameFiles((e) => {
    const files = e.files.filter(({ newUri }) => isEnvFile(newUri.fsPath))
    if (!files.length) {
      return
    }
    env = {}
    updateEnv(env)
  })
  workspace.onDidCreateFiles((e) => {
    const files = e.files.filter(({ fsPath }) => isEnvFile(fsPath))
    if (!files.length) {
      return
    }
    env = {}
    updateEnv(env)
  })
  workspace.onDidDeleteFiles((e) => {
    const files = e.files.filter(({ fsPath }) => isEnvFile(fsPath))
    if (!files.length) {
      return
    }
    env = {}
    updateEnv(env)
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
