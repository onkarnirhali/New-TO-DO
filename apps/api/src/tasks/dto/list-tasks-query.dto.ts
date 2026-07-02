import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "@prisma/client";

export class ListTasksQueryDto {
  @IsString()
  @IsOptional()
  columnId?: string;

  @IsString()
  @IsOptional()
  dashboardId?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
