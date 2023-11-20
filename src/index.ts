import path from 'path'
import {
  type ExtensionContext,
  languages,
  Hover,
  workspace,
  CompletionItemKind,
  CompletionItem,
} from 'vscode'
import { findProp, isEnvFile } from './utils'
import { completionTrigger, langs, rulePrefix, rules } from './constant'
import { genEnvMarkdown, initEnv, readEnv, resolveEnv } from './utils/vscode'

export function activate(ctx: ExtensionContext) {
  const cwd = workspace.workspaceFolders?.[0].uri.fsPath
  if (!cwd) {
    return
  }
  const { rawEnv, wather } = initEnv(cwd)
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
  languages.registerCompletionItemProvider(
    langs,
    {
      provideCompletionItems({ lineAt, languageId }, position) {
        const linePrefix = lineAt(position).text.slice(0, position.character)
        if (!rulePrefix[languageId].test(linePrefix)) {
          return
        }
        CompletionItem
        return Object.entries(env).map(([key, item]) => {
          return {
            label: key,
            detail: key,
            documentation: genEnvMarkdown(item),
            kind: CompletionItemKind.Variable,
          }
        })
      },
    },
    ...completionTrigger,
  )
  languages.registerHoverProvider(langs, {
    provideHover({ languageId, lineAt }, position) {
      const prop = findProp(lineAt(position).text.slice(0), languageId)
      if (!prop) {
        return
      }
      return new Hover(genEnvMarkdown(env[prop], prop))
    },
  })
}

export function deactivate() {}
