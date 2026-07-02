import { IsString, IsNotEmpty } from "class-validator";

export class VerifyNotePasswordDto {
  @IsString()
  @IsNotEmpty()
  password!: string;
}
