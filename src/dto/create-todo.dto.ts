import { IsNotEmpty } from "class-validator"

export class CreateTodoDto {
    @IsNotEmpty()
    todo: string

    @IsNotEmpty()
    completed: boolean

    @IsNotEmpty()
    createBy: string
}