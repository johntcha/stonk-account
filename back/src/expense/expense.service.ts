import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { getRepository } from 'typeorm';
import { ExpenseDto } from './dto/expense.dto';
import { Expense } from './expense.entity';
import { ExpenseRepository } from './expense.repository';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(ExpenseRepository)
        private expenseRepository: ExpenseRepository,
      ) {}
    
    createExpense(
        expenseDto: ExpenseDto,
        users: Users
        ): Promise<Expense> {
        return this.expenseRepository.createExpense(expenseDto, users)
    }

    async getAllUserExpenses(users: Users): Promise<Expense[]>{
        const expenses = await getRepository(Expense)
        .createQueryBuilder("expense")
        .where("expense.userId = :userId", { userId: users.id })
        .getMany();
    
        if (!expenses) {
          throw new NotFoundException(`User doesn't have any expense`);
        }
    
        return expenses
      }
}
