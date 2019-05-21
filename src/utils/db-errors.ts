import { MysqlError } from 'mysql'
import { QueryFailedError } from 'typeorm'

export enum MysqlErrorCode {
  ER_DUP_ENTRY = 1062
}

export function isMysqlError(error: any): error is MysqlError {
  return error.code && error.errno
}

export function isNonUniqueError(error: QueryFailedError) {
  if (isMysqlError(error)) {
    return error.errno === MysqlErrorCode.ER_DUP_ENTRY || error.code === MysqlErrorCode.ER_DUP_ENTRY.toString()
  }
  return false
}
