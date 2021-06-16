import { Expense } from './expense.entity'
import { EntityRepository, Repository } from 'typeorm'
import { ExpenseDto } from './dto/expense.dto'
import { Users } from 'src/users/users.entity';
import { Account } from 'src/account/account.entity';

@EntityRepository(Expense)
export class ExpenseRepository extends Repository<Expense> {
    async createExpense(
        createExpenseDto: ExpenseDto,
        users: Users,
        account: Account
        ): Promise<Expense> {
        const { category, amount, currency, date } = createExpenseDto;

        const expense = new Expense();
        expense.category = category;
        expense.amount = amount;
        expense.currency = currency;
        expense.date = date;
        expense.users = await Users.findOne(users.username);
        expense.account = await Account.findOne(account.id);
        expense.isDebited = false;
        await expense.save();
        delete expense.users

        return expense
    }
}