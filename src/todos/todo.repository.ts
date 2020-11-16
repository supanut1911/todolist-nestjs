import { User } from "src/auth/user.entity";
import { CreateTodoDto } from "src/dto/create-todo.dto";
import { GetTaskFilterDto } from "src/dto/getTodofilter.dto";
import { EntityRepository, Repository } from "typeorm";
import { Todo } from "./todo.entity";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
    async getTodos(filterDto: GetTaskFilterDto, user: User): Promise<Todo[]> {
        const {id, completed} = filterDto
        const query = this.createQueryBuilder('todo')
        query.where('todo.userId = :userId', {userId: user.id});

        if(id) {
            query.andWhere('todo.id = :id', { id: id })
        }

        if(completed) {
            query.andWhere('todo.completed = :completed', { completed: completed })
        }

        const todos = query.getMany()
        return todos
    }

    async createTodo(createtodoDto: CreateTodoDto, user: User): Promise<Todo> {
        const todo = new Todo()
        todo.todo = createtodoDto.todo
        todo.completed = createtodoDto.completed
        todo.user = user        
        await todo.save()

        delete todo.user
        return todo
    }
}

