import { IsString, IsNotEmpty, IsInt, IsOptional, Min } from "class-validator";

export class MoveTaskDto {
  @IsString()
  @IsNotEmpty()
  targetColumnId!: string;

  /**
   * If omitted, the task is appended at the end of the target column.
   * Pass an explicit value for precise drag-and-drop placement.
   */
  @IsInt()
  @Min(0)
  @IsOptional()
  newPosition?: number;
}
