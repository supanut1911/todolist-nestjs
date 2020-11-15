import { IsString, Matches, MaxLength, MinLength, minLength } from "class-validator"

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @IsString()
    @MinLength(6)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    name: string
}