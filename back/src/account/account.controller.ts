import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';

@Controller('account')
@UseGuards(AuthGuard('jwt'))
export class AccountController {
    constructor(private accountService: AccountService){}

    @Post()
    @UsePipes(ValidationPipe)
    async createAccount(
        @Body() accountDto: AccountDto,
        @GetUser() users: Users
        ): Promise<Account> {
        return await this.accountService.createAccount(accountDto, users)
    }
}
