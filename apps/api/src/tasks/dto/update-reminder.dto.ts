import {
  IsEnum,
  IsDateString,
  IsNumber,
  IsInt,
  IsString,
  IsOptional,
  MaxLength,
  Min,
} from "class-validator";
import { ReminderType } from "@prisma/client";

/**
 * All fields optional — the service merges these with the existing
 * reminder. Changing type requires the relevant fields for the new type
 * to also be present; the service validates the final combined state.
 */
export class UpdateReminderDto {
  @IsEnum(ReminderType)
  @IsOptional()
  type?: ReminderType;

  @IsDateString()
  @IsOptional()
  remindAt?: string;

  @IsNumber()
  @IsOptional()
  lat?: number;

  @IsNumber()
  @IsOptional()
  lng?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  radiusMetres?: number;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  label?: string;
}
