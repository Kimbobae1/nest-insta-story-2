import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import {FindStoryDto} from "./dto/find-story.dto";
import {Story} from "./entities/story.entity";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("story")
@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({summary : 'create story'})
  @ApiResponse({status: 201, type: FindStoryDto})
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createStoryDto: CreateStoryDto) {
    const resultStory = await this.storyService.create(createStoryDto);
    const resultDto = new FindStoryDto();
    resultDto.id = resultStory.id;
    resultDto.title = resultStory.title;
    resultDto.author = resultStory.author;
    resultDto.image = resultStory.image;
    resultDto.hashtags = resultStory.hashtags;
    resultDto.createdAt = resultStory.createdAt;
    return resultDto;
  }

  @Get()
  @UsePipes(ValidationPipe)
  @ApiOperation({summary : 'find all story'})
  @ApiResponse({status: 200, type: FindStoryDto})
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const stories = await this.storyService.findAll();
    return stories.map(story => {
      const resultDto = new FindStoryDto();
      resultDto.id = story.id;
      resultDto.title = story.title;
      resultDto.author = story.author;
      resultDto.image = story.image;
      resultDto.hashtags = story.hashtags;
      resultDto.validTime = story.validTime;
      resultDto.createdAt = story.createdAt;
      return resultDto;
    })
  }

}
