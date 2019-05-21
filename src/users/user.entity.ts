import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'
import { Exclude } from 'class-transformer'
import * as crypto from '../utils/crypto'

@Entity({ name: 'user' })
export class UserEntity {
  @Exclude()
  @Column({ type: 'varchar' })
  private password!: string

  @Exclude()
  @CreateDateColumn()
  readonly createdAt!: Date

  @Exclude()
  @UpdateDateColumn()
  readonly updateAt!: Date

  @PrimaryGeneratedColumn('uuid')
  readonly id!: string

  @Column({ type: 'varchar', unique: true })
  username!: string

  @Column({ type: 'varchar', unique: true })
  email!: string

  @Column({ type: 'varchar', nullable: true })
  firstName: string | undefined

  @Column({ type: 'varchar', nullable: true })
  lastName: string | undefined

  @BeforeInsert()
  protected async hashPassword() {
    const encryptedPassword = await crypto.hash(this.password)
    this.password = encryptedPassword
  }

  validatePassword(password: string): Promise<boolean> {
    return crypto.compare(password, this.password)
  }
}
