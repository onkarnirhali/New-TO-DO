import { IsString, IsNotEmpty, IsOptional, MaxLength, Matches } from "class-validator";

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @IsString()
  @IsOptional()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: "color must be a valid hex colour e.g. #7C3AED" })
  color?: string;
}
