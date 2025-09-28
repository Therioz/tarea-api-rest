import { IsEnum } from "class-validator";
import { Status } from "@prisma/client";

export class UpdateStatusDto {
  @IsEnum(["PENDING", "IN_PROGRESS", "COMPLETED"])
  status: Status;
}
