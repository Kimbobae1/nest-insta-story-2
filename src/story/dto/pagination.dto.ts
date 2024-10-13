import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNotEmpty, IsNumber, IsPositive} from "class-validator";

export class PaginationDto {
    @ApiProperty()
    page : string;

    @ApiProperty()
    @IsNotEmpty()
    limit : string;
}