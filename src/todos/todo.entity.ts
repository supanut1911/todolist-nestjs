import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    todo: string

    @Column()
    completed: boolean

    @Column()
    createBy: number
    @ManyToOne(type => User, user => user.todos, { eager: false  })
    @JoinColumn({ name: 'createBy'})
    user: User 
}