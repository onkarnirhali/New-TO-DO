import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @IsOptional()
  title?: string;

  /**
   * TipTap JSON document. Left untyped (any) — the API stores and returns
   * it opaquely; only the rich-text editor on the frontend interprets it.
   */
  @IsOptional()
  content?: unknown;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  contentPreview?: string;
}
