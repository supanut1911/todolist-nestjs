import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto } from "./Dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        let {username, password, name} = authCredentialDto

        let salt = await bcrypt.genSalt()

        let user = new User()
        user.username = username
        user.password = await this.hashPassword(password, salt)
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
    
    async validateUserPassword(authCredentialDto: AuthCredentialDto): Promise<string> {
        let { username, password } = authCredentialDto 
        let user = await this.findOne({username})
        if ((user) && (await this.validatePassword(password, user.password))){
            return user.username
        } else {
            return null
        }
    }

    private hashPassword(password: string, salt): string {
        return bcrypt.hash(password, salt)
    }

    private async validatePassword(password: string, userPassword: string): Promise<Boolean> {
        let hash = await bcrypt.compare(password, userPassword)
        return hash 
    }
}