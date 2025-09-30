import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateTaskDto,
  UpdateTaskStatusDto,
  TaskFilterDto,
} from "./dto/task.dto";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { dueDate, ...rest } = createTaskDto;

    return this.prisma.task.create({
      data: {
        ...rest,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
  }

  async findAllTasks(filters: TaskFilterDto): Promise<Task[]> {
    const { status, search } = filters;

    return this.prisma.task.findMany({
      where: {
        ...(status && { status }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto
  ): Promise<Task> {
    // Verificar que la tarea existe
    const existingTask = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.task.update({
      where: { id },
      data: { status: updateTaskStatusDto.status },
    });
  }

  async findTaskById(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }
}
