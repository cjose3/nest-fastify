import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '../config/config.service'
import { Injectable } from '@nestjs/common'
import { IDatabaseConnection } from './db.interfaces'

@Injectable()
export class DefaultConnection implements IDatabaseConnection, TypeOrmOptionsFactory {
  readonly name: string = 'default'

  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      name: this.name,
      // This field es required because a bug og TypeORM, the database's name should be taken from the connection URL
      // https://github.com/typeorm/typeorm/issues/2096
      database: this.config.databaseName,
      url: this.config.databaseUrl,
      keepConnectionAlive: true,
      retryAttempts: 5,
      entities: [`${this.config.srcPath}/**/**.entity.ts`],
      synchronize: true
      // migrations: [`${this.config.migrationsPath}/*.js`],
      // cli: {
      //   migrationsDir: '/migrations'
      // }
    }
  }
}
