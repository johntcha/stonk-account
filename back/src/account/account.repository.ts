import { Account } from './account.entity'
import { EntityRepository, Repository } from 'typeorm'
import { AccountDto } from './dto/account.dto'
import { Users } from 'src/users/users.entity';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
    async createAccount(
        createAccountDto: AccountDto,
        users: Users,
        ): Promise<Account> {
        const { name } = createAccountDto;

        const account = new Account();
        account.name = name;
        account.users = await Users.findOne(users.username);
        await account.save();
        delete account.users

        return account
    }
}