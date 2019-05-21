import { Injectable } from '@nestjs/common'
import * as path from 'path'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig

  constructor() {
    this.envConfig = getEnvConfig()
  }

  get port(): number {
    return Number(this.envConfig.PORT)
  }

  get logLevel(): string {
    return String(this.envConfig.LOG_LEVEL)
  }

  get environment(): string {
    return String(this.envConfig.NODE_ENV)
  }

  get isDevelopment(): boolean {
    return ['development', 'local'].includes(this.environment)
  }

  get databaseUrl(): string {
    return String(this.envConfig.DATABASE_URL)
  }

  get databaseName(): string {
    return String(this.envConfig.DATABASE_URL)
  }

  get rootPath(): string {
    return path.join(__dirname, '/../../../')
  }

  get srcPath(): string {
    return path.join(this.rootPath, '/src')
  }

  get migrationsPath(): string {
    return path.join(this.rootPath, '/migrations')
  }
}

interface EnvConfig {
  [key: string]: string | undefined
}

function getEnvConfig(): EnvConfig {
  const env = process.env.NODE_ENV || 'development'
  const parseFile = (filePath: string): EnvConfig =>
    fs.existsSync(filePath) ? dotenv.parse(fs.readFileSync(filePath)) : {}

  let envConfig: EnvConfig = {}

  switch (true) {
    case env === 'production':
      envConfig = process.env
      break
    case ['local', 'test', 'development'].includes(env):
      envConfig = { ...parseFile('.env.dev'), ...parseFile(`.env.${process.env.NODE_ENV}`) }
      break
    default:
      envConfig = { ...parseFile(`.env.${process.env.NODE_ENV}`), ...parseFile(`.env`) }
      if (Object.entries(envConfig).length === 0) {
        envConfig = process.env
      }
  }

  return envConfig
}
