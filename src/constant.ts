/* eslint-disable @stylistic/quotes */

import { Meta } from "./types"

const meta: Meta = {
  javascript: {
    token: [
      ['process', 'env'],
      ['import', 'meta', 'env'],
    ],
    joiner: '\\??.',
    joinEnd: true,
    capture: '([\\w]+)',
  },
  typescript: {
    token: [
      ['process', 'env'],
      ['import', 'meta', 'env'],
    ],
    joiner: '\\??.',
    joinEnd: true,
    capture: '([\\w]+)',
  },
  python: {
    token: ['os', 'getenv'],
    joiner: '.',
    capture: `\\(["']([\\w]+)["']\\)`,
  },
  ruby: {
    token: ['#{', 'ENV', '\\["([\\w]+)"]\\', '}'],
  },
  go: {
    token: ['os', 'Getenv'],
    joiner: '.',
    capture: '\\("([\\w]+)"\\)',
  },
  php: {
    token: ['\\{', '\\$_SERVER', `\\['([\\w]+)'\\]`, '\\}'],
  },
  rust: {
    token: ['std', 'env', 'var'],
    joiner: '::',
    capture: '\\("([\\w]+)"\\)',
  },
}

export const rules = Object.fromEntries(
  Object.entries(meta).map(([lang, { token, joiner, joinEnd, capture }]) => {
    // TODO: judege if token is string[][]
    const tokens = (Array.isArray(token[0]) ? token : [token]) as string[][]
    let rule = ''
    for (const item of tokens) {
      rule += item.join(joiner ?? '')
      if (joinEnd) {
        rule += joiner
      }
      rule += capture || ''
      rule += '|'
    }
    rule = rule.slice(0, rule.length - 1)
    return [lang, new RegExp(rule)]
  }),
)

export const langs = Object.keys(rules)

export const ignorePattern = [
  '**/node_modules/**',
  '**/.vscode/**',
  '**/.git/**',
  '**/dist/**',
  '**/.vscode-test/**',
  '**/*.vsix/**',
  '**/.idea/**',
  '**/.DS_Store/**',
]
