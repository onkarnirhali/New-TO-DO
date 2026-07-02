import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsDateString,
} from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  columnId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  title!: string;

  @IsString()
  @IsOptional()
  @MaxLength(5000)
  description?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  linkedNoteId?: string;
}
