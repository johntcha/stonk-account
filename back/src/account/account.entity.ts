import { Expense } from 'src/expense/expense.entity';
import { Users } from 'src/users/users.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'

@Entity()
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Users, user => user.expenses)
    users: Users

    @OneToMany(() => Expense, expense => expense.account)
    expenses: Expense[]
}