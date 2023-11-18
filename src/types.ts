import { DotenvParseOutput } from 'dotenv'

export type EnvValue = Record<'path' | 'name' | 'value', string>

export type Env = Record<string, EnvValue[]>

export type RawEnv = Record<string, DotenvParseOutput>
