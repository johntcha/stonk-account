import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
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
}
