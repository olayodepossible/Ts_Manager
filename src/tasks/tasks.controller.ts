import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/task-filter-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Body() filterDto: FilterTaskDto): Promise<Task[]> {
    return this.tasksService.getAllTasks(filterDto);
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
