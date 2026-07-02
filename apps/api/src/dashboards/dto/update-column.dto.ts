import { IsString, IsNotEmpty, IsOptional, MaxLength, Matches } from "class-validator";

export class UpdateColumnDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: "color must be a valid hex colour e.g. #7C3AED" })
  color?: string;
}
