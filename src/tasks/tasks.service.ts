import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title, description): Task {
    const task: Task = {
      id: uuid(),
      title,
      desc: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
