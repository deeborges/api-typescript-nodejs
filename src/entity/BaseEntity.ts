import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
  // sao comportamentos que todas as class terão, porque nao reutilizar? ;)
  @PrimaryGeneratedColumn('uuid') // gera um código baseado na estrutura de hash
    uid: string;

  @Column({ default: true})
  actived: boolean;

  @Column({ default: false})
  deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date
}
