import { IsArray, IsInt, IsString, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class PositionItemDto {
  @IsString()
  id!: string;

  @IsInt()
  @Min(0)
  position!: number;
}

export class ReorderItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PositionItemDto)
  items!: PositionItemDto[];
}
