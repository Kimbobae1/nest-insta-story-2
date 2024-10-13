import {ApiProperty} from "@nestjs/swagger";
import {ArrayNotEmpty, IsArray, IsDate, IsIn, IsNotEmpty, IsNumber, IsString, IsUrl, Matches} from "class-validator";

export class FindStoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id : number;
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    createdAt : Date;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title : string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsIn([12,24])
    validTime : number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    author : string;
    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    image : string;
    @ApiProperty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @Matches(/^#[a-zA-Z0-9_]+$/, {each : true, message: "Hashtags must begin with '#'"})
    hashtags : string[];
}
