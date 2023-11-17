export type EnvValue = Record<'path' | 'name' | 'value', string>

export type Env = Record<string, EnvValue[]>
