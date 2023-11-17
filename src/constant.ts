const meta = [
  ['process', 'env'],
  ['import', 'meta', 'env'],
]

const optionalJoiner = '\\??.'
const suffixWord = '([\\w]+)'

export const EnvReg = new RegExp(
  meta
    .map((item) => {
      const prefix = item.join(optionalJoiner)
      const rule = prefix + optionalJoiner + suffixWord
      return rule
    })
    .join('|'),
)
