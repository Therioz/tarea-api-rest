import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TaskStatus } from "@prisma/client";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from "class-validator";

export class CreateTaskDto {
  @ApiProperty({ description: "Título de la tarea" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: "Descripción de la tarea" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: "Fecha de vencimiento (ISO 8601)" })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
}

export class UpdateTaskStatusDto {
  @ApiProperty({
    enum: TaskStatus,
    description: "Nuevo estado de la tarea",
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class TaskFilterDto {
  @ApiPropertyOptional({
    enum: TaskStatus,
    description: "Filtrar por estado",
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({ description: "Filtrar por título (búsqueda parcial)" })
  @IsString()
  @IsOptional()
  search?: string;
}

export class TaskResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  dueDate: Date | null;

  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus;

  @ApiProperty()
  updatedAt: Date;
}
