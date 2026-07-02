import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: unknown;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  contentPreview?: string;
}
