import {ApiProperty} from "@nestjs/swagger";

export class FindStoryDto {
    @ApiProperty()
    id : number;
    @ApiProperty()
    createdAt : Date;
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
