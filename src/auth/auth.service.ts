import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './Dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    signUp(authCredentialDto: AuthCredentialDto) {
        return this.userRepository.signUp(authCredentialDto)
    }

    signIn(authCredentialDto: AuthCredentialDto) {
        let username =  this.userRepository.validateUserPassword(authCredentialDto)
        if (!username) {
            throw new UnauthorizedException('invalid credential')
        } 

        
        
    }
}
