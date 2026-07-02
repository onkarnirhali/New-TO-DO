import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class UpdateDashboardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}
