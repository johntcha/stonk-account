import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { ExpenseDto } from './dto/expense.dto';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';

@Controller('expense')
@UseGuards(AuthGuard('jwt'))
export class ExpenseController {
    constructor(private expenseService: ExpenseService){}

    @Get()
    getUserExpenses(
        @GetUser() users: Users
    ): Promise<Expense[]> {
        return this.expenseService.getAllUserExpenses(users);
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    createExpense(
        @Body() expenseDto: ExpenseDto,
        @GetUser() users: Users
        ): Promise<Expense> {
        return this.expenseService.createExpense(expenseDto, users)
    }

    @Delete('/:id')
    @UsePipes(ValidationPipe)
    deleteExpense(
        @Param('id', ParseIntPipe)
        id:number
        ): Promise<void> {
        return this.expenseService.deleteExpense(id)
    }
}
