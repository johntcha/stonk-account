import { Account } from 'src/account/account.entity';
import { Users } from 'src/users/users.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity()
export class Expense extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @Column("decimal", { precision: 10, scale: 2 })
    amount: number;

    @Column()
    currency: string;
    
    @Column('timestamptz')
    date: Date;

    @ManyToOne(() => Users, user => user.expenses)
    users: Users

    @ManyToOne(() => Account, account => account.expenses)
    account: Account

    @Column('bool')
    isDebited: boolean
}