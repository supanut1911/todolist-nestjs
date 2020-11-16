import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    todo: string

    @Column()
    completed: boolean

    // @Column()
    // createBy: string

    @ManyToOne(type => User, user => user.todos, { eager: false  })
    user: User 

    @Column()
    userId: number
}