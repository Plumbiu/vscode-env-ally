import path from 'path'
import { type ExtensionContext, languages, Hover, workspace } from 'vscode'
import { findProp, isEnvFile } from './utils'
import { langs, rules } from './constant'
import { genEnvMarkdown, initEnv, readEnv, resolveEnv } from './utils/vscode'

export function activate(ctx: ExtensionContext) {
  const workspaces = workspace.workspaceFolders?.map(({ uri }) => uri.fsPath)
  if (!workspaces) {
    return
  }
  const { rawEnv, wather } = initEnv(workspaces)
  let env = resolveEnv(rawEnv)
  for (const w of wather) {
    // `onDidChange` API need debounce, we can use workspace.onDidSaveTextDocument to achieve it.
    w.onDidCreate((e) => {
      rawEnv[path.normalize(e.fsPath)] = readEnv(e.fsPath)
      env = resolveEnv(rawEnv)
    })
    w.onDidDelete((e) => {
      delete rawEnv[path.normalize(e.fsPath)]
      env = resolveEnv(rawEnv)
    })
  }
  workspace.onDidSaveTextDocument(({ fileName }) => {
    if (isEnvFile(fileName)) {
      rawEnv[path.normalize(fileName)] = readEnv(fileName)
      env = resolveEnv(rawEnv)
    }
  })
  languages.registerHoverProvider(langs, {
    provideHover({ languageId, getText, getWordRangeAtPosition }, position) {
      const prop = findProp(
        getText(getWordRangeAtPosition(position, rules[languageId])),
        languageId,
      )
      return new Hover(genEnvMarkdown(env[prop], prop))
    },
  })
}

export function deactivate() {}
