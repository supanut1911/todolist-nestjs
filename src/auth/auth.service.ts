import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './Dto/auth-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto) {
        return this.userRepository.signUp(authCredentialDto)
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string }> {
        let username =  await this.userRepository.validateUserPassword(authCredentialDto)
        
        if (!username) {
            throw new UnauthorizedException('invalid credential')
        } 

        let payload: JwtPayload = { username }
        let accessToken = await this.jwtService.sign(payload)
        
        return { accessToken }

    }
}
