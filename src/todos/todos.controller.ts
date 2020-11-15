import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { GetTaskFilterDto } from 'src/dto/getTodofilter.dto';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private todoService: TodosService) {}

    @Get()
    getTodos(@Query() filerDto: GetTaskFilterDto): Promise<Todo[]> {
        return this.todoService.getTodos(filerDto)
    }

    @Get('/:id')
    getTodoById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
        return this.todoService.getTodoById(id)
    }

    @Post()
    createTodo(@Body() createDto: CreateTodoDto): Promise<Todo> {
        return this.todoService.createTodo(createDto)
    }

    @Delete('/:id')
    deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.todoService.deleteTodo(id)
    }

    @Patch('/:id')
    updateTodo(
        @Param('id', ParseIntPipe) id: number,
        @Body('todo') todo: string,
        @Body('completed', ParseBoolPipe) completed: boolean
    ): Promise<Todo> {
        return this.todoService.updateTodo(id, todo, completed)
    }
}
