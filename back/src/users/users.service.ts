import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity'
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}
  
  async createUser(createUserDto: CreateUserDto): Promise<Users>{
    const found = await this.usersRepository.findOne({where: {username: `${createUserDto.username}`}});
    if (found){
      throw new ConflictException(`This username already exists`);
    }
    else{
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = await this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword
      });
      return this.usersRepository.createUser(createdUser);
    }
  }

  async getUserByUsername(username: string): Promise<Users>{
    const found = await this.usersRepository.findOne({where: {username: `${username}`}});

    if (!found) {
      throw new NotFoundException(`User or password incorrect`);
    }

    return found
  }
}