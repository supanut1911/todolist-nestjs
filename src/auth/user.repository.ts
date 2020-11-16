import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto } from "./Dto/auth-credential.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        let {username, password, name} = authCredentialDto

        let user = new User()
        user.username = username
        user.password = password
        user.name = name

        try {
            await user.save()
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exites')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }
}