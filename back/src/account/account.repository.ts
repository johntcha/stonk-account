import { Account } from './account.entity'
import { EntityRepository, Repository } from 'typeorm'
import { AccountDto } from './dto/account.dto'
import { Users } from 'src/users/users.entity';
import { Expense } from 'src/expense/expense.entity';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
    async createAccount(
        createAccountDto: AccountDto,
        users: Users,
        ): Promise<Account> {
        const { id, name } = createAccountDto;

        const account = new Account();
        account.id = id;
        account.name = name;
        account.users = await Users.findOne(users.username);
        await account.save();
        delete account.users

        return account
    }
}