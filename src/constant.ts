/* eslint-disable @stylistic/quotes */

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
