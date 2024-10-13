import {ApiProperty} from "@nestjs/swagger";

export class CreateStoryDto {
    @ApiProperty()
    title : string;
    @ApiProperty()
    validTime : number;
    @ApiProperty()
    author : string;
    @ApiProperty()
    image : string;
    @ApiProperty()
    hashtags : string[];
}
