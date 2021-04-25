import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseRepository } from './expense.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseRepository])
  ],
  providers: [ExpenseService],
  controllers: [ExpenseController]
})
export class ExpenseModule {}
