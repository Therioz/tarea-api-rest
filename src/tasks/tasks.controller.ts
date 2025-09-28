import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { ApiKeyGuard } from "../common/guards/api-key.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";

@UseGuards(ApiKeyGuard)
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    createTaskDto: CreateTaskDto
  ) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.tasksService.findAll(query);
  }

  @Patch(":id/status")
  async updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true }))
    updateStatusDto: UpdateStatusDto
  ) {
    return this.tasksService.updateStatus(id, updateStatusDto);
  }
}
