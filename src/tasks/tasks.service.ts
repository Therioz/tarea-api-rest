import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const data: Prisma.TaskCreateInput = {
      title: createTaskDto.title,
      description: createTaskDto.description ?? null,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
    };
    return this.prisma.task.create({ data });
  }

  // Filters: status, search (title/description), dueBefore, dueAfter, limit, offset
  async findAll(query: any) {
    const where: Prisma.TaskWhereInput = {};
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
      ];
    }
    if (query.dueBefore || query.dueAfter) {
      where.dueDate = {};
      if (query.dueBefore)
        (where.dueDate as any).lt = new Date(query.dueBefore);
      if (query.dueAfter) (where.dueDate as any).gt = new Date(query.dueAfter);
    }

    const take = query.limit ? Number(query.limit) : 20;
    const skip = query.offset ? Number(query.offset) : 0;

    return this.prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take,
      skip,
    });
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusDto) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException("Task not found");
    return this.prisma.task.update({
      where: { id },
      data: { status: updateStatusDto.status },
    });
  }
}
