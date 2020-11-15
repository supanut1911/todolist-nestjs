import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './Dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    signup(
        @Body(ValidationPipe) authcreadentialDto: AuthCredentialDto
    ): string {
        this.authService.signUp(authcreadentialDto)    
        return 'signup success'
    }
}
