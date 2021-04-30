import { Users } from 'src/users/users.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity()
export class Expense extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @Column("decimal", { precision: 5, scale: 2 })
    amount: number;

    @Column()
    currency: string;
    
    @Column('timestamptz')
    date: Date;

    @ManyToOne(() => Users, user => user.expenses)
    users: Users
}