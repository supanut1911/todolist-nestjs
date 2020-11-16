import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './Dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

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
    ): Promise<{ accessToken: string}> {
        return this.authService.signIn(authCredentialDto)
    }

    @Post('/test')
    @UseGuards(AuthGuard()) 
    test(
        @GetUser() user: User
    ) {
        console.log(user);
    }
}
