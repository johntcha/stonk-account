import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountRepository])
  ],
  controllers: [AccountController],  
  providers: [AccountService]
})
export class AccountModule {}
