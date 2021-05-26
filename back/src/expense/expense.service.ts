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
    
    async createExpense(
        expenseDto: ExpenseDto,
        users: Users
        ): Promise<Expense> {
        return await this.expenseRepository.createExpense(expenseDto, users)
    }

    async deleteExpense(
      id: number,
    ): Promise<void> {
      const result = await this.expenseRepository.delete(id)
      if (result.affected === 0 ){
        throw new NotFoundException('Expense not found')
      }
    }

    async getExpenseById(id: number): Promise<Expense> {
      const found = await this.expenseRepository.findOne(id);

      if(!found) {
        throw new NotFoundException(`Expense with ID "${id}" not found`);
      }
      return found;
    }

    async getAllUserExpenses(users: Users): Promise<Expense[]>{
        const expenses = await getRepository(Expense)
        .createQueryBuilder("expense")
        .where("expense.usersUsername = :usersUsername", { usersUsername: users.username })
        .getMany();
    
        if (!expenses) {
          throw new NotFoundException(`User doesn't have any expense`);
        }
    
        return expenses
      }

    async activateIsDebited(id: number): Promise<Expense>{
      const expense = await this.getExpenseById(id)
      expense.isDebited = !expense.isDebited;
      await expense.save();
      return expense
    }
}
