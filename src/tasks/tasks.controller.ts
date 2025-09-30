import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiSecurity,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import { ApiKeyGuard } from "../auth/api-key.guard";
import {
  CreateTaskDto,
  UpdateTaskStatusDto,
  TaskFilterDto,
  TaskResponseDto,
} from "./dto/task.dto";

@ApiTags("Tasks")
@ApiSecurity("api-key")
@Controller("tasks")
@UseGuards(ApiKeyGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Crear una nueva tarea" })
  @ApiResponse({
    status: 201,
    description: "Tarea creada exitosamente",
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 400, description: "Datos inválidos" })
  @ApiResponse({ status: 401, description: "API Key inválida" })
  async createTask(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto
  ): Promise<TaskResponseDto> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todas las tareas con filtros opcionales" })
  @ApiResponse({
    status: 200,
    description: "Lista de tareas",
    type: [TaskResponseDto],
  })
  @ApiResponse({ status: 401, description: "API Key inválida" })
  @ApiQuery({
    name: "status",
    required: false,
    enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
    description: "Filtrar por estado",
  })
  @ApiQuery({
    name: "search",
    required: false,
    type: String,
    description: "Buscar en título y descripción",
  })
  async findAllTasks(
    @Query(ValidationPipe) filters: TaskFilterDto
  ): Promise<TaskResponseDto[]> {
    return this.tasksService.findAllTasks(filters);
  }

  @Patch(":id/status")
  @ApiOperation({ summary: "Actualizar el estado de una tarea" })
  @ApiResponse({
    status: 200,
    description: "Estado de tarea actualizado",
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 400, description: "Datos inválidos" })
  @ApiResponse({ status: 401, description: "API Key inválida" })
  @ApiResponse({ status: 404, description: "Tarea no encontrada" })
  async updateTaskStatus(
    @Param("id") id: string,
    @Body(ValidationPipe) updateTaskStatusDto: UpdateTaskStatusDto
  ): Promise<TaskResponseDto> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtener una tarea por ID" })
  @ApiResponse({
    status: 200,
    description: "Detalles de la tarea",
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 401, description: "API Key inválida" })
  @ApiResponse({ status: 404, description: "Tarea no encontrada" })
  async findTaskById(@Param("id") id: string): Promise<TaskResponseDto> {
    return this.tasksService.findTaskById(id);
  }
}
