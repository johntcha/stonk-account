import { Users } from './users.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDto } from './dto/user.dto'

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
    async createUser(createUserDto: CreateUserDto): Promise<Users> {
        const { username, password } = createUserDto;

        const user = new Users();
        user.username = username;
        user.password = password;
        await user.save();

        return user
    }
}