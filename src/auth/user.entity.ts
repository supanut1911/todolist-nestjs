import { type } from "os";
import { Todo } from "src/todos/todo.entity";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    
    username: string

    @Column()
    password: string

    @Column()
    name: string

    @OneToMany(type => Todo, todo => todo.user, { eager: true })
    todos: Todo[]
}