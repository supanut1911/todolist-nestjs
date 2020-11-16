import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { GetTaskFilterDto } from 'src/dto/getTodofilter.dto';
import { Todo } from './todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodosService {

    constructor(
        @InjectRepository(TodoRepository)
        private todoRepository: TodoRepository
    ) {}
    
    async getTodoById(
        id: number,
        user: User
    ): Promise<Todo> {
        const found = await this.todoRepository.findOne({ where: { id, userId: user.id}})        
        if(!found) {
            throw new NotFoundException()
        }

        return found
    }

    async getTodos(
        filterDto: GetTaskFilterDto,
        user: User
    ): Promise<Todo[]> {        
        return this.todoRepository.getTodos(filterDto, user)
    }

    async createTodo(
        createtodoDto: CreateTodoDto,
        user: User
    ): Promise<Todo> {
        return this.todoRepository.createTodo(createtodoDto, user)
    }

    async deleteTodo(
        id: number,
        user: User
    ): Promise<void> {
        const result = await this.todoRepository.delete({id, userId: user.id })
        if (result.affected === 0) {
            throw new NotFoundException(`not found id ${id}`)
        }
    }

    async updateTodo(
        id:number,
        todo: string,
        completed: boolean,
        user: User
    ): Promise<Todo> {
        let foundtodo = await this.getTodoById(id, user)
        
        foundtodo.todo = todo
        foundtodo.completed = completed
        
        await foundtodo.save()
        return foundtodo
    }
}
