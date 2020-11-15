import { CreateTodoDto } from "src/dto/create-todo.dto";
import { GetTaskFilterDto } from "src/dto/getTodofilter.dto";
import { EntityRepository, Repository } from "typeorm";
import { Todo } from "./todo.entity";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
    async getTodos(filterDto: GetTaskFilterDto): Promise<Todo[]> {
        const {id, completed} = filterDto
        const query = this.createQueryBuilder('todo')

        if(id) {
            query.andWhere('todo.id = :id', { id: id })
        }

        if(completed) {
            query.andWhere('todo.completed = :completed', { completed: completed })
        }

        const todos = query.getMany()
        return todos
    }

    async createTodo(createtodoDto: CreateTodoDto): Promise<Todo> {
        const todo = new Todo()
        todo.todo = createtodoDto.todo
        todo.completed = createtodoDto.completed
        todo.createBy = createtodoDto.createBy

        await todo.save()
        return todo
    }
}

