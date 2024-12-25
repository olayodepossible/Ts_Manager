import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task.model';
import { NotFoundException } from '@nestjs/common';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});
const mockUser = {
  id: 'someId',
  username: 'someuser',
  password: 'somepassword',
  tasks: [],
};

const mockTask = {
  id: 'somdId',
  title: 'Test title',
  desc: 'test desc',
  status: TaskStatus.OPEN,
};

describe('TasksService', () => {
  let taskService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return tasks', async () => {
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      taskRepository.getTasks.mockResolvedValue('someValue');
      const res = await taskService.getAllTasks(null, mockUser);

      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(res).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('should return a task by its Id', async () => {
      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await taskService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });
  });

  describe('getTaskById', () => {
    it('should handle exception when the task return is null', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(taskService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
