import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { ConfigModule } from '../config/config.module'
import { DefaultConnection } from './db.connections'

const modules: TypeOrmModuleAsyncOptions[] = [
  {
    useClass: DefaultConnection,
    imports: [ConfigModule]
  }
]

@Module({
  imports: modules.map(module => TypeOrmModule.forRootAsync(module))
})
export class DatabaseModule {}
