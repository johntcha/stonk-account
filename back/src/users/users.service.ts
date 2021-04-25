import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity'
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  
  async createUser(createUserDto: CreateUserDto): Promise<Users>{
    return this.usersRepository.createUser(createUserDto);
  }

  async getUserByUsername(username: string): Promise<Users>{
    const found = await this.usersRepository.findOne({where: {username: `${username}`}});

    if (!found) {
      throw new NotFoundException(`User or password incorrect`);
    }

    return found
  }
  async findOne(username: string) {
    return this.usersRepository.findOne(username);
  }
}