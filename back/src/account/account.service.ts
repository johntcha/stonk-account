import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Account } from './account.entity';
import { AccountRepository } from './account.repository';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountRepository)
        private accountRepository: AccountRepository,
    ) {}

    async createAccount(accountDto: AccountDto, users: Users): Promise<Account>{
        return await this.accountRepository.createAccount(accountDto, users)
    }
}
