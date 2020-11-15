import { Injectable } from '@nestjs/common';
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
}
