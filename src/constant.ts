/* eslint-disable @stylistic/quotes */

export const rulePrefix: Record<string, RegExp> = {
  javascript: /(process|import\??.meta\??)\??.env\\??./,
  typescript: /(process|import\??.meta\??)\??.env\\??./,
  javascriptreact: /(process|import\??.meta\??)\??.env\\??./,
  typescriptreact: /(process|import\??.meta\??)\??.env\\??./,
  vue: /import\??.meta\??.env\\??./,
  astro: /import\??.meta\??.env\\??./,
  svelte: /import\??.meta\??.env\\??./,
  python: /os.getenv\(["']/,
  ruby: /os.getenv\(["']/,
  go: /os.Getenv\("/,
  php: /\{\$_SERVER\['/,
  rust: /std::env::var\("/,
}

export const completionTrigger = ['.', '[', '(', '"', "'"]

export const rules: Record<string, RegExp> = {
  javascript: /(process|import\??.meta\??)\??.env\??.([\w]+)/,
  typescript: /(process|import\??.meta\??)\??.env\??.([\w]+)/,
  javascriptreact: /(process|import\??.meta\??)\??.env\??.([\w]+)/,
  typescriptreact: /(process|import\??.meta\??)\??.env\??.([\w]+)/,
  vue: /import\??.meta\??.env\??.([\w]+)/,
  astro: /import\??.meta\??.env\??.([\w]+)/,
  svelte: /import\??.meta\??.env\??.([\w]+)/,
  python: /os.getenv\(["']([\w]+)["']\)/,
  ruby: /os.getenv\(["']([\w]+)["']\)/,
  go: /os.Getenv\("([\w]+)"\)/,
  php: /\{\$_SERVER\['([\w]+)'\]\}/,
  rust: /std::env::var\("([\w]+)"\)/,
}

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
