import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm'
import { Expense } from 'src/expense/expense.entity';

@Entity()
@Unique(['username'])
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Expense, expense => expense.users)
    expenses: Expense[]
}