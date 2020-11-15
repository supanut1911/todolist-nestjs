import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    todo: string

    @Column()
    completed: boolean

    @Column()
    createBy: string
}