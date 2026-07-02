import {
  IsEnum,
  IsDateString,
  IsNumber,
  IsInt,
  IsString,
  IsOptional,
  MaxLength,
  Min,
  ValidateIf,
} from "class-validator";
import { ReminderType } from "@prisma/client";

/**
 * DTO for creating a reminder.
 *
 * Reminders are a discriminated union:
 *   - TIME: requires remindAt
 *   - LOCATION: requires lat, lng, radiusMetres (label is optional)
 *
 * @ValidateIf makes the typed fields conditionally required so the
 * validation error is "remindAt is required for TIME reminders"
 * instead of a 500 or a silent null write.
 */
export class SetReminderDto {
  @IsEnum(ReminderType)
  type!: ReminderType;

  // ── TIME fields ──────────────────────────────────────────────────────
  @ValidateIf((o: SetReminderDto) => o.type === ReminderType.TIME)
  @IsDateString({}, { message: "remindAt must be an ISO 8601 date string" })
  @IsString()
  remindAt?: string;

  // ── LOCATION fields ──────────────────────────────────────────────────
  @ValidateIf((o: SetReminderDto) => o.type === ReminderType.LOCATION)
  @IsNumber({}, { message: "lat is required for LOCATION reminders" })
  lat?: number;

  @ValidateIf((o: SetReminderDto) => o.type === ReminderType.LOCATION)
  @IsNumber({}, { message: "lng is required for LOCATION reminders" })
  lng?: number;

  @ValidateIf((o: SetReminderDto) => o.type === ReminderType.LOCATION)
  @IsInt({ message: "radiusMetres is required for LOCATION reminders" })
  @Min(1)
  radiusMetres?: number;

  // Optional for both types
  @IsString()
  @IsOptional()
  @MaxLength(200)
  label?: string;
}
