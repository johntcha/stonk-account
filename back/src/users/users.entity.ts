import { BaseEntity, Entity, Column, OneToMany, Unique, PrimaryColumn } from 'typeorm'
import { Expense } from 'src/expense/expense.entity';

@Entity()
@Unique(['username'])
export class Users extends BaseEntity {
    @PrimaryColumn()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Expense, expense => expense.users)
    expenses: Expense[]
}