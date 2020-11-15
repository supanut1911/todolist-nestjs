import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoRepository])
  ],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
