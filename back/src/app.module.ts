import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseController } from './expense/expense.controller';
import { ExpenseModule } from './expense/expense.module';
import { ExpenseService } from './expense/expense.service';
import { AccountModule } from './account/account.module';
import { CoModule } from './co/co.module';
import { SModule } from './s/s.module';



@Module({
  imports: [
    AuthModule, 
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ExpenseModule,
    AccountModule,
    CoModule,
    SModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
