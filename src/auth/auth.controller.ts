import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './Dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signup(
        @Body(ValidationPipe) authcreadentialDto: AuthCredentialDto
    ): string {
        this.authService.signUp(authcreadentialDto)    
        return 'signup success'
    }

    @Post('/signin')
    singIn(
        @Body() authCredentialDto: AuthCredentialDto
    ): Promise<void> {
        return this.authService.signIn(authCredentialDto)
    }
}
