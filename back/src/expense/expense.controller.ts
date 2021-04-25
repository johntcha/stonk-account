import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetUser } from 'src/users/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { ExpenseDto } from './dto/expense.dto';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
    constructor(private expenseService: ExpenseService){}

    @Post()
    @UsePipes(ValidationPipe)
    createUser(
        @Body() expenseDto: ExpenseDto,
        @GetUser() users: Users
        ): Promise<Expense> {
        return this.expenseService.createExpense(expenseDto, users)
    }
}
