import { Expense } from './expense.entity'
import { EntityRepository, Repository } from 'typeorm'
import { ExpenseDto } from './dto/expense.dto'
import { Users } from 'src/users/users.entity';

@EntityRepository(Expense)
export class ExpenseRepository extends Repository<Expense> {
    async createExpense(
        createExpenseDto: ExpenseDto,
        users: Users
        ): Promise<Expense> {
        const { category, amount, currency, usersUsername } = createExpenseDto;

        const expense = new Expense();
        expense.category = category;
        expense.amount = amount;
        expense.currency = currency;
        expense.users = await Users.findOne(users.username);
        await expense.save();

        return expense
    }
}