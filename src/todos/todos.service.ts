import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    
    async getTodoById(id: number): Promise<Todo> {
        const found = await this.todoRepository.findOne(id)        
        if(!found) {
            throw new NotFoundException()
        }

        return found
    }

    async getTodos(filterDto: GetTaskFilterDto): Promise<Todo[]> {
        return this.todoRepository.getTodos(filterDto)
    }

    async createTodo(createtodoDto: CreateTodoDto): Promise<Todo> {
        return this.todoRepository.createTodo(createtodoDto)
    }

    async deleteTodo(id: number): Promise<void> {
        const result = await this.todoRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException(`not found id ${id}`)
        }
    }

    async updateTodo(id:number, todo: string, completed: boolean): Promise<Todo> {
        let foundtodo = await this.getTodoById(id)
        
        foundtodo.todo = todo
        foundtodo.completed = completed
        
        await foundtodo.save()
        return foundtodo
    }
}
