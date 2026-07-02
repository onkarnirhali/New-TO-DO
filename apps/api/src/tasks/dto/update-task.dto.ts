import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsDateString,
  IsEnum,
} from "class-validator";
import { TaskStatus } from "@prisma/client";

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(5000)
  description?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsString()
  @IsOptional()
  linkedNoteId?: string;
}
