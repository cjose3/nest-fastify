import * as bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export function hash(value: string): Promise<string> {
  return bcrypt.hash(value, SALT_ROUNDS)
}

export async function compare(value: string, encryptedValue: string): Promise<boolean> {
  return bcrypt.compare(value, encryptedValue)
}
