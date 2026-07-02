import { IsString, MinLength, MaxLength } from "class-validator";

export class SetNotePasswordDto {
  @IsString()
  @MinLength(4)
  @MaxLength(128)
  password!: string;
}
