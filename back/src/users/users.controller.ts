import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateUserDto } from './dto/user.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get('/:username')
    getUserByUsername(@Param('username') username: string): Promise<Users>{
        return this.usersService.getUserByUsername(username)
    }
    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
        return this.usersService.createUser(createUserDto)
    }
}